import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import reportsRouter from "./routes/reports";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportsRouter);

app.get("/", (req, res) => {
    res.send("ClockIT is running!");
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));