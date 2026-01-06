const express = require("express");
const { getContractEvents } = require("../controllers/contractEventController");

const router = express.Router();

router.get("/", getContractEvents);

module.exports = router;