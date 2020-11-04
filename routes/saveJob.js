const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Save a job
router.patch("/", async (req, res) => {
  const { email, jobToSave } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      if (jobToSave === null || jobToSave === undefined) {
        res.status(400).json({ msg: "An error occurred. Please try again." });
      } else {
        user = await User.findOneAndUpdate(
          { email: email },
          { $push: { savedJobs: jobToSave } },
          { new: true }
        );

        res.json({ user });
      }
    } else {
      res.status(400).json({ msg: "No such user exists." });
    }
  } catch (error) {
    res.status(400).json({ msg: "An error occurred. Please try again." });
  }
});

module.exports = router;
