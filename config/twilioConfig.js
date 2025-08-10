const twilio = require('twilio');
require('dotenv').config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const alertPhone = process.env.ALERT_PHONE_NUMBER;

module.exports = { twilioClient, alertPhone };
