const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String, required: true, minlength: process.env.MIN_PASSWORD_LENGTH},
  isAdmin: {type: Boolean, default: false},
});

module.exports = User = mongoose.model("user", userSchema);