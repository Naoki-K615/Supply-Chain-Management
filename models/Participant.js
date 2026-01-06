const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, enum: ["Supplier", "Manufacturer", "Distributor", "Retailer"], required: true }
});

module.exports = mongoose.model("Participant", ParticipantSchema);