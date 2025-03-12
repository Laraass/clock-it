import mongoose from "mongoose";

const timeReportSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    hoursWorked: { type: Number, required: true },
    project: { type: String, required: true },
    description: { type: String, required: true }
}, {timestamps: true});

export const TimeReport = mongoose.model("TimeReport", timeReportSchema);