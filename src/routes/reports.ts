import express from "express";
import { 
  getAllReports, 
  getReportById, 
  createReport, 
  updateReport, 
  deleteReport 
} from "../controllers/TimeReportController";
import { authMiddleware } from "../middleware/auth";
import { TimeReport } from "../models/TimeReport";

const router = express.Router();

// Fetch reports created by logged in user
router.get("/my-reports", authMiddleware, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "No user found." });
    return;
  }

  try {
    const userId = req.user.id;
    const reports = await TimeReport.find({ userId: userId });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch user time reports." });
  }
});

router.get("/", authMiddleware, getAllReports);
router.get("/:id", authMiddleware, getReportById);
router.post("/", authMiddleware, createReport);
router.put("/:id", authMiddleware, updateReport);
router.delete("/:id", authMiddleware, deleteReport);

export default router;
