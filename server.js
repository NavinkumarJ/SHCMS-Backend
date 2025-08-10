const express = require('express');
const mongoose = require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const vitalRoutes = require('./routes/vitalRoutes');
const { saveAndEmitVitals } = require('./controllers/vitalController');
const userRoutes = require('./routes/userRoutes');
const chatbotRoutes = require("./routes/chatBot");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatbotRoutes);  // Make sure it's correctly mapped
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/vitals', vitalRoutes);
app.use('/api/user', userRoutes);

// WebSocket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

io.on('connection', (socket) => {
  console.log('WebSocket connected');
  // Emit vitals data every 5 seconds
  setInterval(() => {
    saveAndEmitVitals(socket);  // Ensure this function is well-optimized
  }, 5000);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
