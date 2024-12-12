const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String },
    address: { type: String },
    company: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    notes: { type: String },
});

module.exports = mongoose.model("Client", ClientSchema);
