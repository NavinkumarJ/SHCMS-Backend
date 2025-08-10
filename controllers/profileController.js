const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).send("User not found");

    res.json(user.profile || {});
  } catch (err) {
    res.status(500).send("Error fetching profile: " + err.message);
  }
};

const updateProfile = async (req, res) => {
  const { name, age, gender, phone, profilePicture } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).send("User not found");

    user.profile = { name, age, gender, phone, profilePicture };
    await user.save();

    res.send("Profile updated successfully");
  } catch (err) {
    res.status(500).send("Error updating profile: " + err.message);
  }
};

module.exports = { getProfile, updateProfile };
