import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT_LENGTH: process.env.SALT_LENGTH,
};

export default config;
