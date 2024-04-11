import express from "express";
import cors from "cors";
import dbConnect from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;

await dbConnect();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
