import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import logger from "../../utils/logger.js";
import config from "../../config/config.js";
import { isNotEmptyArray } from "../../utils/helpers.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { responseCodes } from "../../utils/constants.js";

dotenv.config();

//Fuction to generate auth token
export const generateAuthToken = (user) => {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: "1hr" });
  return token;
};

//Function to verify token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ");
    if (!isNotEmptyArray(token))
      return sendResponse(res, responseCodes.UNAUTHORIZED, {
        error: "Access denied",
      });
    const decodedToken = jwt.verify(token[1], config.SECRET_KEY);
    req.email = decodedToken.email;
    next();
  } catch (error) {
    logger.error(`Error verifying token: ${error.message}`);
    sendResponse(res, responseCodes.UNAUTHORIZED, {
      error: "Invalid token",
    });
  }
};

//Function to hash password
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_LENGTH));
    return bcrypt.hash(password, salt);
  } catch (error) {
    logger.error(`Error hashing password: ${error.message}`);
    throw error;
  }
};

//Fuction to verify password
export const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error(`Error verifying password: ${error.message}`);
    throw error;
  }
};
