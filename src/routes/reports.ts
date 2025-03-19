import express from "express";
import { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport 
} from "../controllers/TimeReportController";

const router = express.Router();

// CRUD functions
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
