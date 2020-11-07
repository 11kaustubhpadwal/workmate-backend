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
        let jobExists = await User.exists({
          savedJobs: {
            $elemMatch: { id: jobToSave.id },
          },
        });

        if (jobExists) {
          res.status(400).json({ msg: "You have already saved this job!" });
        } else {
          user = await User.findOneAndUpdate(
            { email: email },
            { $push: { savedJobs: jobToSave } },
            { new: true }
          );

          res.json({ user, msg: "Job has been saved successfully." });
        }
      }
    } else {
      res.status(400).json({ msg: "No such user exists." });
    }
  } catch (error) {
    res.status(400).json({ msg: "An error occurred. Please try again." });
  }
});

module.exports = router;
