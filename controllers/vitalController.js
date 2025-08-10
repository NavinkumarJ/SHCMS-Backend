const Vital = require('../models/Vital');
const { twilioClient, alertPhone } = require('../config/twilioConfig');
require('dotenv').config();

const generateVitals = () => {
  return {
    heartRate: Math.floor(Math.random() * (120 - 60 + 1)) + 60,
    // heartRate: 50,
    oxygenSaturation: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    bodyTemperature: (Math.random() * (39 - 36) + 36).toFixed(2),
    bloodPressure: `${Math.floor(Math.random() * (140 - 90 + 1)) + 90}/${Math.floor(Math.random() * (90 - 60 + 1)) + 60}`, // Generate Blood Pressure
  };
};

const saveAndEmitVitals = async (socket) => {
  const vitals = generateVitals();

  // Check for abnormal vitals
  if (
    vitals.heartRate < 60 || 
    vitals.heartRate > 120 || 
    vitals.oxygenSaturation < 90 || 
    parseInt(vitals.bloodPressure.split('/')[0]) > 140 || 
    parseInt(vitals.bloodPressure.split('/')[1]) > 90
  ) {
    // Send alert via Twilio
    twilioClient.messages
      .create({
        body: `Alert: Abnormal vitals detected! Heart Rate: ${vitals.heartRate}, Oxygen Saturation: ${vitals.oxygenSaturation}%, Blood Pressure: ${vitals.bloodPressure}`,
        to: [process.env.ALERT_PHONE_NUMBER,process.env.ALERT_PHONE_NUMBER1,process.env.ALERT_PHONE_NUMBER2], // Replace with alert phone number
        from: process.env.TWILIO_PHONE_NUMBER, // Replace with Twilio number
      })
      .then((message) => console.log('Alert sent:', message.sid));
  }

  // Save the vitals to the database
  const vitalRecord = new Vital(vitals);
  await vitalRecord.save();

  // Emit the vitals to connected clients
  socket.emit('vitalUpdate', vitals);
};

module.exports = { saveAndEmitVitals };
