const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, default: "" },
    role: { type: String, default: "" },
    avatar: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    text: { type: String, required: true },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
