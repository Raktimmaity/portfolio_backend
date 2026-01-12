const mongoose = require("mongoose");

const resumeEntrySchema = new mongoose.Schema(
  {
    category: { type: String, enum: ["Education", "Professional Experience"], required: true },
    duration: { type: String, default: "" },
    title: { type: String, default: "" },
    organization: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeEntry", resumeEntrySchema);
