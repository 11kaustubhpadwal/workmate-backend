const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Unsave a job
router.patch("/", async (req, res) => {
  const { email, jobToUnsave } = req.body;

  try {
    let userExists = await User.findOne({ email: email });

    if (userExists) {
      if (jobToUnsave === null || jobToUnsave === undefined) {
        res.status(400).json({ msg: "An error occurred. Please try again." });
      } else {
        user = await User.findOneAndUpdate(
          { email: email },
          { $pull: { savedJobs: jobToUnsave } },
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
