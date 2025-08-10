const User = require('../models/User'); // Ensure User model is properly imported

const getUserProfile = async (req, res) => {
  try {
    
    console.log("get:",req.user.username);
    const user = await User.findOne({username:req.user.username}); 
    console.log("fetout",user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const postUserProfile = async (req, res) => {
  try {
    
    const { name, age, gender, phone } = req.body;
    
    const profilePicture = req.file ? req.file.path : null; // Handle no file scenario
    console.log("val",req.body);
    console.log("File",req.file);
    const user = await User.findOne({username:req.user.username});
    console.log("outnow",user);
    user.profile = { name, age, gender, phone, profilePicture };

    await user.save();
    res.status(201).json({ name, age, gender, phone, profilePicture });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


module.exports = { getUserProfile,postUserProfile }; // Export the function properly
