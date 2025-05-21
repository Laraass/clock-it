import express from "express";
import { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport 
} from "../controllers/TimeReportController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Protect routes with authMiddleware
router.get("/", authMiddleware, getAllReports);
router.get("/:id", authMiddleware, getReportById);
router.post("/", authMiddleware, createReport);
router.put("/:id", authMiddleware, updateReport);
router.delete("/:id", authMiddleware, deleteReport);

export default router;
