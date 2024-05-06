import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import logger from "../../utils/logger.js";
import config from "../../config/config.js";

dotenv.config();

export const generateAuthToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: "1hr" });
  return token;
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_LENGTH));
    return bcrypt.hash(password, salt);
  } catch (error) {
    logger.error(`Error hashing password: ${error.message}`);
    throw error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error(`Error verifying password: ${error.message}`);
    throw error;
  }
};
