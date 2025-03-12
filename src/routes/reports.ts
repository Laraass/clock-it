import express, { Request, Response } from "express";
import { TimeReport } from "../models/TimeReport";

const router = express.Router();

// GET - Fetch all reports
const getAllReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = await TimeReport.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

router.get("/", getAllReports);

// GET - Fetch a specific report
const getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
        const report = await TimeReport.findById(req.params.id);
        if (!report) {
            res.status(404).json({ message: "Report not found" });
            return;
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

router.get("/:id", getReportById);

// POST - Create report
const createReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const newReport = new TimeReport(req.body);
        await newReport.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

router.post("/", createReport);

// PUT - Update report
const updateReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedReport = await TimeReport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReport) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json(updatedReport);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

router.put("/:id", updateReport);

// DELETE - Delete report
const deleteReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedReport = await TimeReport.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json({ message: "Report deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

router.delete("/:id", deleteReport);

export default router;