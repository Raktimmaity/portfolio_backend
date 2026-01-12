const CoActivity = require("../models/CoActivity");

const getCoActivities = async (req, res) => {
  try {
    const items = await CoActivity.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createCoActivity = async (req, res) => {
  try {
    const { title, imageUrl, date, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const item = await CoActivity.create({
      title,
      imageUrl: imageUrl || "",
      date: date || "",
      description: description || "",
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCoActivity = async (req, res) => {
  try {
    const { title, imageUrl, date, description } = req.body;
    const item = await CoActivity.findByIdAndUpdate(
      req.params.id,
      {
        title,
        imageUrl: imageUrl || "",
        date: date || "",
        description: description || "",
      },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Co-Activity not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCoActivity = async (req, res) => {
  try {
    const item = await CoActivity.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Co-Activity not found" });
    res.json({ message: "Co-Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCoActivities, createCoActivity, updateCoActivity, deleteCoActivity };
