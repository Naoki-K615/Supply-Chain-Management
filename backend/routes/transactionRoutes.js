const express = require("express");
const {
  recordTransaction,
  getTransactions
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", recordTransaction);
router.get("/", getTransactions);

module.exports = router;