import * as userService from "../../modules/user/user.service.js";
import logger from "../../utils/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";

// Middleware function to check if the logged-in user has the "admin" role
export const authorizeAdmin = (req, res, next) => {
  // Check if the user object exists on the request object and if the user's role is "admin"
  if (req.user && req.user.role === "admin") {
    // If the user is admin, call the next middleware function in the chain
    next();
  } else {
    // If the user is not admin, send a forbidden response with an error message
    return sendResponse(res, responseCodes.FORBIDDEN, {
      message: "Forbidden access",
    });
  }
};

// Function to handle user signup request
export const signup = async (req, res) => {
  try {
    const { user } = await userService.signup(req.body);
    return sendResponse(res, responseCodes.CREATED, { user });
  } catch (error) {
    logger.error(`Error signing up user: ${error.message}`);
    return sendResponse(res, responseCodes.BAD_REQUEST, {
      message: error.message,
    });
  }
};

// Function to handle user login request
export const login = async (req, res) => {
  try {
    const { token } = await userService.login(req, res);
    return sendResponse(res, responseCodes.SUCCESS, { token });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    return sendResponse(res, responseCodes.UNAUTHORIZED, {
      message: error.message,
    });
  }
};

// Function to handle user logout request
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
