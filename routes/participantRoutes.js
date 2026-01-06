const express = require("express");
const { addParticipant, getAllParticipants } = require("../controllers/participantController");

const router = express.Router();

router.post("/add", addParticipant);
router.get("/", getAllParticipants);

module.exports = router;