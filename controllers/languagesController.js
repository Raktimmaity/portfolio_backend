const Language = require("../models/Language");

const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find().sort({ createdAt: 1 });
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createLanguage = async (req, res) => {
  try {
    const { name, speak, read, write, percentage } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const language = await Language.create({
      name,
      speak: Number.isFinite(speak) ? speak : 0,
      read: Number.isFinite(read) ? read : 0,
      write: Number.isFinite(write) ? write : 0,
      percentage: Number.isFinite(percentage) ? percentage : 0,
    });
    res.status(201).json(language);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const { name, speak, read, write, percentage } = req.body;
    const language = await Language.findByIdAndUpdate(
      req.params.id,
      {
        name,
        speak: Number.isFinite(speak) ? speak : 0,
        read: Number.isFinite(read) ? read : 0,
        write: Number.isFinite(write) ? write : 0,
        percentage: Number.isFinite(percentage) ? percentage : 0,
      },
      { new: true }
    );
    if (!language) return res.status(404).json({ message: "Language not found" });
    res.json(language);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language) return res.status(404).json({ message: "Language not found" });
    res.json({ message: "Language deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLanguages, createLanguage, updateLanguage, deleteLanguage };
