const express = require("express");
const { createShipment, getAllShipments, updateShipmentStatus } = require("../controllers/shipmentController");

const router = express.Router();

router.post("/add", createShipment);
router.post("/update", updateShipmentStatus)
router.get("/", getAllShipments);

module.exports = router;