const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,  // Keep the timeout option
  bufferCommands: false,           // Disable buffering if necessary
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = mongoose;
