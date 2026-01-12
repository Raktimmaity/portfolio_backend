const Activity = require("../models/Activity");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createActivity = async (req, res) => {
  try {
    const { title, platform, date } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const activity = await Activity.create({
      title,
      platform: platform || "",
      date: date || "",
    });
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { title, platform, date } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        title,
        platform: platform || "",
        date: date || "",
      },
      { new: true }
    );
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getActivities, createActivity, updateActivity, deleteActivity };
