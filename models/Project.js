const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    projectLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    projectType: { type: String, enum: ["Academic", "Major", "Minor"], default: "Minor" },
    skills: { type: [String], default: [] },
    cost: { type: String, enum: ["Free", "Paid"], default: "Free" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
