const StrengthInterest = require("../models/StrengthInterest");

const getStrengthsInterests = async (req, res) => {
  try {
    const items = await StrengthInterest.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createStrengthInterest = async (req, res) => {
  try {
    const { category, name } = req.body;
    if (!category || !name) {
      return res.status(400).json({ message: "Category and name are required" });
    }
    const item = await StrengthInterest.create({ category, name });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateStrengthInterest = async (req, res) => {
  try {
    const { category, name } = req.body;
    const item = await StrengthInterest.findByIdAndUpdate(
      req.params.id,
      { category, name },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStrengthInterest = async (req, res) => {
  try {
    const item = await StrengthInterest.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStrengthsInterests,
  createStrengthInterest,
  updateStrengthInterest,
  deleteStrengthInterest,
};
