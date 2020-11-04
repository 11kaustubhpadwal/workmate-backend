const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  savedJobs: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", UserSchema);
