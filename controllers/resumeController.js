const ResumeEntry = require("../models/ResumeEntry");

const getResumeEntries = async (req, res) => {
  try {
    const entries = await ResumeEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createResumeEntry = async (req, res) => {
  try {
    const { category, duration, title, organization, description } = req.body;
    if (!category) return res.status(400).json({ message: "Category is required" });
    const entry = await ResumeEntry.create({
      category,
      duration: duration || "",
      title: title || "",
      organization: organization || "",
      description: description || "",
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateResumeEntry = async (req, res) => {
  try {
    const { category, duration, title, organization, description } = req.body;
    const entry = await ResumeEntry.findByIdAndUpdate(
      req.params.id,
      {
        category,
        duration: duration || "",
        title: title || "",
        organization: organization || "",
        description: description || "",
      },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteResumeEntry = async (req, res) => {
  try {
    const entry = await ResumeEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getResumeEntries, createResumeEntry, updateResumeEntry, deleteResumeEntry };
