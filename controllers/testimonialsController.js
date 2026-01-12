const Testimonial = require("../models/Testimonial");

const getApprovedTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find({ status: 1 }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { name, email, profession, role, avatar, rating, text, comment } = req.body;
    const messageText = text || comment || "";
    if (!name || !messageText) {
      return res.status(400).json({ message: "Name and testimonial text are required" });
    }
    const item = await Testimonial.create({
      name,
      email: email || "",
      role: role || profession || "",
      avatar: avatar || "",
      rating: Number(rating) || 0,
      text: messageText,
      status: 0,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTestimonialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: Number(status) || 0 },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getApprovedTestimonials,
  createTestimonial,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
};
