const mongoose = require("mongoose");

const coActivitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    date: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoActivity", coActivitySchema);
