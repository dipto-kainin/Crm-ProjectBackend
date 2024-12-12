const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Unpaid", "Paid", "Overdue"],
        default: "Unpaid",
    },
    dueDate: { type: Date },
    issuedDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
