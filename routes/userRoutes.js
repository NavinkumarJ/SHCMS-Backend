const express = require('express');
const { getUserProfile,postUserProfile } = require('../controllers/userController'); // Make sure you are importing a function
const authMiddleware = require('../middleware/authMiddleware'); // Ensure it's imported as a function
const User = require("../models/User"); 


const router = express.Router();


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Specify the folder where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
    },
  });
  

const upload = multer({ storage });


router.get('/profile', authMiddleware, getUserProfile);
router.post('/profile',upload.single("profilePicture"),authMiddleware, postUserProfile);


module.exports = router;
