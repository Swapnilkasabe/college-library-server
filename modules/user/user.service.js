import UserModel from "../../models/User.js";
import {
  generateAuthToken,
  hashPassword,
  verifyPassword,
} from "../auth/auth.service.js";
import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";

// User signup
export const signup = async (req, res) => {
  const srcFn = "signup";
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    logger.info(`Signed up successfully: ${newUser._id}`);
    return sendResponse(res, responseCodes.SUCCESS, {
      success: true,
      message: "User signed up successfully",
      user: newUser.email,
    });
  } catch (error) {
    logger.error(`Error signing up user: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

// User login
export const login = async (req, res) => {
  const srcFn = "login";
  try {
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
    return sendResponse(res, responseCodes.SUCCESS, {
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

//Checking if the email exists for password reset
export const checkEmailExists = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      return sendResponse(res, responseCodes.SUCCESS, {
        emailExists: true,
        success: true,
        message: "Email verified",
      });
    } else {
      return sendResponse(res, responseCodes.NOT_FOUND, { emailExists: false });
    }
  } catch (error) {
    logger.error(`Error checking email existence: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

//Reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Fetch the user from the database
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return sendResponse(res, responseCodes.NOT_FOUND, {
        error: "User not found",
      });
    }
    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password and save the changes
    user.password = hashedPassword;
    const token = generateAuthToken(user);
    await user.save();
    // Send success response
    return sendResponse(res, responseCodes.SUCCESS, {
      success: true,
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

// Get user profile
export const getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UserModel.findById(userId).select(
      "firstName lastName email"
    );
    if (!user) {
      return sendResponse(res, responseCodes.NOT_FOUND, {
        error: "User not found",
      });
    }
    return sendResponse(res, responseCodes.SUCCESS, {
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`Error fetching user profile: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

export const getUser = async (email, res) => {
  try {
    const user = await UserModel.find({ email });
    return user[0];
  } catch (error) {
    logger.error(`Error fetching user profile: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

// Logout service function
export const logout = async (req, res) => {
  try {
    return sendResponse(res, responseCodes.SUCCESS, {
      message: "Logout successful",
    });
  } catch (error) {
    logger.error(`Error logging out: ${error.message}`);
    return sendResponse(res, responseCodes.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};
