import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import reportsRoutes from "./src/routes/reports";
import usersRouter from "./src/routes/users";
import { METHODS } from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
app.use(express.json());

// Routes
app.use("/api/reports", reportsRoutes);
app.use("/api/users", usersRouter);

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
  .catch((error) => console.error("MongoDB connection error:", error));
