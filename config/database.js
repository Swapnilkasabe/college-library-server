import "dotenv/config";
import mongoose from "mongoose";
import UserModel from "../models/User.js";

const url = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log(`Connected to database`);
    await UserModel.init();
  } catch (error) {
    console.log(`Error connecting database: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
