"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeReport = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timeReportSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    hoursWorked: { type: Number, required: true },
    project: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });
exports.TimeReport = mongoose_1.default.model("TimeReport", timeReportSchema);
