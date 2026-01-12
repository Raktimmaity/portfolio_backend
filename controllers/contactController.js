const ContactMessage = require("../models/ContactMessage");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }
    const saved = await ContactMessage.create({
      name,
      email,
      subject: subject || "",
      message,
    });
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createContactMessage, getContactMessages, deleteContactMessage };
