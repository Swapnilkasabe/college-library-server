import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";
import studentRoutes from "./routes/studentRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import bookTransactionRoutes from "./routes/bookTransactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://college-library-ui.vercel.app/"], // Whitelist the domains you want to allow
};

// Enable CORS for all routes
app.use(cors(corsOptions));
// Parse incoming JSON data
app.use(express.json({ extended: true }));
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Mount student routes on the '/api/students' path for student management functionalities
app.use("/api/students", studentRoutes);

// Mount book routes on the '/api/books' path for book management functionalities
app.use("/api/books", bookRoutes);

// Mount book transaction routes on the 'api/book-transactions' path for book transactions management functionalities
app.use("/api/book-transactions", bookTransactionRoutes);

// Mount user routes on the '/api/users' path for user management functionalities
app.use("/api/users", userRoutes);

app.get("/api/", (req, res) => res.send("Hello From Server. App is working."));

const PORT = config.PORT || 5000;

// Connect to the database
try {
  await dbConnect();
  app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
} catch (error) {
  logger.error(`Error connecting to the database: ${error.message}`);
}
