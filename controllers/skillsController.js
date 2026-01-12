const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, imageUrl, percentage } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const skill = await Skill.create({
      name,
      imageUrl: imageUrl || "",
      percentage: Number.isFinite(percentage) ? percentage : 0,
    });
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { name, imageUrl, percentage } = req.body;
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name,
        imageUrl: imageUrl || "",
        percentage: Number.isFinite(percentage) ? percentage : 0,
      },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
