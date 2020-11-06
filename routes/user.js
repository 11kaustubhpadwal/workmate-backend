const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Register a new user or return an existing user
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      res.json({ user: userExists });
    } else {
      if (email === "") {
        res.status(400).json({ msg: "An error occurred. Please try again." });
      } else {
        let user = new User({
          email: email,
        });

        await user.save();

        res.json({ user });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "An error occurred. Please try again." });
  }
});

module.exports = router;
