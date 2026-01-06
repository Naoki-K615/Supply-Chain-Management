const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
    medicineId: { type: Number, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    trackingId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Pending", "InTransit", "Delivered"], required: true }
});

module.exports = mongoose.model("Shipment", ShipmentSchema);