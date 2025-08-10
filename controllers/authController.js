const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register new user
const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  try {
    // console.log("Already here:",user);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user: " + err.message);
  }
};

// Login existing user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(403).send("Invalid password");

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || "SECRET_KEY");
    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
};

module.exports = { register, login };
