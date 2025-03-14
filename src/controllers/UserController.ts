import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "onekey321";

// Register new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    if (password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered!"});
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Log in
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters" });
        return;
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in!" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;