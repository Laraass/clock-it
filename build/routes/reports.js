"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TimeReport_1 = require("../models/TimeReport");
const router = express_1.default.Router();
// GET - Fetch all reports
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield TimeReport_1.TimeReport.find();
    res.json(reports);
}));
// GET - Fetch a specific report
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield TimeReport_1.TimeReport.findById(req.params.id);
        if (!report)
            return res.status(404).json({ message: "Report not found" });
        res.json(report);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
// POST - Create a report 
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReport = new TimeReport_1.TimeReport(req.body);
        yield newReport.save();
        res.status(201).json(newReport);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
// PUT - Update report
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReport = yield TimeReport_1.TimeReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport)
            return res.status(404).json({ message: "Not found" });
        res.json(updatedReport);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
// DELETE - Delete report
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReport = yield TimeReport_1.TimeReport.findByIdAndDelete(req.params.id);
        if (!deletedReport)
            return res.status(404).json({ message: "Not found" });
        res.json({ message: "Report deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
exports.default = router;
