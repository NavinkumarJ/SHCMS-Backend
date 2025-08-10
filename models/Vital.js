const mongoose = require('mongoose');

const VitalSchema = new mongoose.Schema({
  heartRate: { type: Number, required: true },
  oxygenSaturation: { type: Number, required: true },
  bodyTemperature: { type: Number, required: true },
  bloodPressure: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now },
});

const Vital = mongoose.model('Vital', VitalSchema);

module.exports = Vital;
