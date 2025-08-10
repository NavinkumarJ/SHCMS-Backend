const express = require('express');
const router = express.Router();
const { chatWithBot } = require('../controllers/chatbotController');

// Ensure the route is correctly defined
router.post('/', chatWithBot);  // Handle POST requests to /api/chat

module.exports = router;
