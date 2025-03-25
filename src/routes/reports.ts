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

// CRUD functions
router.get("/", getAllReports);
router.get("/:id", getReportById);

// Middleware for CRUD functions
router.post("/", authMiddleware, createReport);
router.put("/:id", authMiddleware, updateReport);
router.delete("/:id", authMiddleware, deleteReport); 

export default router;
