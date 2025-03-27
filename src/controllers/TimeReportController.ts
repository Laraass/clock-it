import { Request, Response } from "express";
import { TimeReport } from "../models/TimeReport";


// GET - Fetch all reports
export const getAllReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = await TimeReport.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


// GET - Fetch a specific report
export const getReportById = async (req: Request, res: Response): Promise<void> => {
    try {
        const report = await TimeReport.findById(req.params.id);
        if (!report) {
            res.status(404).json({ message: "Time report does not exist" });
            return;
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


// POST - Create report
export const createReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const newReport = new TimeReport({
            ...req.body,
            userId: req.user,
        });

        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


// PUT - Update report
export const updateReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedReport = await TimeReport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReport) {
            res.status(404).json({ message: "Time report does not exist" });
            return;
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


// DELETE - Delete report
export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedReport = await TimeReport.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            res.status(404).json({ message: "Time report does not exist" });
            return;
        }
        res.json({ message: "Time report deleted" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};