import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import config from "./config.js";
import logger from "../utils/logger.js";
dotenv.config();

const url = config.MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    logger.info(`Connected to database`);
    await UserModel.init();
  } catch (error) {
    logger.error(`Error connecting database: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
