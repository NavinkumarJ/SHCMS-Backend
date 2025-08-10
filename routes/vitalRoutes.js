const express = require('express');
const router = express.Router();
const { saveAndEmitVitals } = require('../controllers/vitalController');

// WebSocket route (to be handled by socket.js)
router.get('/vitals', (req, res) => {
  res.send('Vitals WebSocket running');
});

module.exports = router;
