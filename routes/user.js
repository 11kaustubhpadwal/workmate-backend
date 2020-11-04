const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Register a new user
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ msg: "User already exists." });
    } else {
      let user = new User({
        email: email,
      });

      await user.save();

      res.json({ user });
    }
  } catch (error) {
    res.status(400).json({ msg: "An error occurred. Please try again." });
  }
});

// Get all saved jobs of a user
router.get("/", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      let savedJobs = userExists.savedJobs;

      res.json(savedJobs);
    } else {
      res.status(400).json({ msg: "No such user exists." });
    }
  } catch (error) {
    res.status(400).json({ msg: "An error occurred. Please try again." });
  }
});

module.exports = router;
