import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },  
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "PENDING",
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "MEDIUM",
    },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("task", TaskSchema);
