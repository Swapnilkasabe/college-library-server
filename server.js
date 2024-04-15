import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";
const app = express();
dotenv.config();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);

const PORT = config.PORT || 5000;

await dbConnect();
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
