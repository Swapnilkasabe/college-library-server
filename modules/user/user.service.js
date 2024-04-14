import UserModel from "../../models/User.js";
import {
  generateAuthToken,
  hashPassword,
  verifyPassword,
} from "../auth/auth.service.js";
import logger from "../../utils/logger.js";
import { responseCodes, sendResponse } from "../../utils/sendResponse.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  const srcFn = "signup";
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, responseCodes.BAD_REQUEST, {
        errors: errors.array(),
      });
    }
    const { username, email, password, firstName, lastName, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });
    await newUser.save();
    logger.info(`Signed up successfully: ${newUser._id}`);
    return { user: newUser._id };
  } catch (error) {
    logger.error(`Error signing up user: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const srcFn = "login";
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, responseCodes.BAD_REQUEST, {
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      return sendResponse(res, responseCodes.NOT_FOUND, {
        error: "User not found",
      });
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      logger.warn(`Incorrect password provided for user: ${user._id}`);
      return sendResponse(res, responseCodes.UNAUTHORIZED, {
        error: "Incorrect password",
      });
    }

    const token = generateAuthToken(user);
    logger.info(`User logged in successfully: ${user._id}`);
    return sendResponse(res, responseCodes.SUCCESS, { token });
  } catch (error) {
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, responseCodes.BAD_REQUEST, {
        errors: errors.array(),
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendResponse(res, responseCodes.NOT_FOUND, {
        error: "User not found",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    const token = generateAuthToken(user);
    await user.save();
    return sendResponse(res, responseCodes.SUCCESS, {
      message: "Password updated successfully",
      token,
    });
  } catch (error) {
    logger.error(`Error resetting password: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};
