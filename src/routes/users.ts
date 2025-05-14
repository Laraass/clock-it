import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/UserController";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

router.post("/logout", logoutUser)

export default router;
