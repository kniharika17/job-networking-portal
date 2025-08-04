// server/routes/applications.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import

router.post("/apply", authMiddleware, async (req, res) => {  // ✅ Use
  try {
    const user = await User.findById(req.userId); // ✅ req.userId set by middleware
    if (!user) return res.status(401).json({ message: "Invalid user" });

    const { jobId, title, company, location } = req.body;

    const existing = await Application.findOne({ userId: user._id, jobId });
    if (existing) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const newApp = new Application({
      userId: user._id,
      jobId,
      title,
      company,
      location
    });

    await newApp.save();
    res.status(201).json({ message: "Application submitted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
// GET /api/applications/my
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId });
    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

router.get("/list", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});
    

module.exports = router;
