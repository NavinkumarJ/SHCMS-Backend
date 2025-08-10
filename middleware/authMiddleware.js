const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  console.log(req.body);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Authorization Token:", token); // Log the token
  
  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log decoded payload
    req.user = decoded;
   
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = authMiddleware;
