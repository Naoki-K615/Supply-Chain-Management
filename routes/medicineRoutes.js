const express = require("express");
const {
  addMedicine,
  getAllMedicines,
  getMedicineHistory,
  getMedicineStage,
} = require("../controllers/medicineController");

const router = express.Router();

router.post("/add", addMedicine);
router.get("/", getAllMedicines);
router.get("/:id/history", getMedicineHistory);
router.get("/:id/stage", getMedicineStage);

module.exports = router;