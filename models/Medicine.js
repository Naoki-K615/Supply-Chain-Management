const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
    blockchainId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    supplier: { type: String, default: null },
    manufacturer: { type: String, default: null },
    distributor: { type: String, default: null },
    retailer: { type: String, default: null },
    stage: { type: String, enum: ["Ordered", "RawMaterialSupplied", "Manufactured", "Distributed", "Retail", "Sold"], required: true }
});

module.exports = mongoose.model("Medicine", MedicineSchema);