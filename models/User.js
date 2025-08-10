const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: [true, "Username Taken"] },
  password: { type: String, required: true }, // Assume this is hashed
  profile: {
    name: { type: String, default: null },
    age: { type: Number, default: null },
    gender: { type: String, default: null },
    phone: { type: String, default: null },
    profilePicture: { type: String, default: null }, // Path or URL for profile picture
  },
});

module.exports = mongoose.model("User", UserSchema);
