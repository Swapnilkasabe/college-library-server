import UserModel from "../../models/User.js";
import {
  generateAuthToken,
  hashPassword,
  verifyPassword,
} from "../auth/auth.service.js";
import logger from "../../utils/logger.js";
import { responseCodes, sendResponse } from "../../utils/sendResponse.js";
import { validationResult } from "express-validator";

export const signup = async (userData) => {
  const srcFn = "signup";
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, responseCodes.BAD_REQUEST, {
        errors: errors.array(),
      });
    }
    const { password, ...otherData } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({ ...otherData, password: hashedPassword });
    await newUser.save();
    logger.info(`Signed up successfully: ${newUser._id}`);
    return { user: newUser._id };
  } catch (error) {
    logger.error(`Error signing up user: ${error.message}`);
    throw new Error("Error signing up user");
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
      logger.warn(`IIncorrect password provided for user: ${user._id}`);
      return sendResponse(res, responseCodes.UNAUTHORIZED, {
        error: "Incorrect password",
      });
    }

    const token = generateAuthToken(user);
    logger.info(`User logged in successfully: ${user._id}`);
    return sendResponse(res, responseCodes.SUCCESS, { token });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    throw new Error("Error logging in user");
  }
};
