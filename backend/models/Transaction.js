const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    medicineId: { type: Number, required: true },
    participant: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Number, required: true }
});

module.exports = mongoose.model("Transaction", TransactionSchema);