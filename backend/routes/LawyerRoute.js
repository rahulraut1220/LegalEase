const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getLawyers } = require("../controllers/contractController");

// Get all lawyers
router.get("/", protect, getLawyers);

module.exports = router;