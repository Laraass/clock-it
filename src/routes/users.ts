import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/UserController";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Log in route
router.post("/login", loginUser);

//Log out route
router.post("/logout", logoutUser)

export default router;
