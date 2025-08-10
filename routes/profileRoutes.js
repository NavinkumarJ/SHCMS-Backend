const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, getProfile); // Fetch profile
router.put("/", authenticateToken, updateProfile); // Update profile

module.exports = router;
