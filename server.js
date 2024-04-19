import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";
import studentRoutes from "./routes/studentRoutes.js";

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON data
app.use(express.json({ extended: true }));
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Mount student routes on the '/api/students' path for student management functionalities
app.use("/api/students", studentRoutes);

const PORT = config.PORT || 5000;

// Connect to the database
await dbConnect();

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
