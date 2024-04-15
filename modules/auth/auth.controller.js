import * as userService from "./user.service.js";
import logger from "../../utils/logger.js";
import sendResponse from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";

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
