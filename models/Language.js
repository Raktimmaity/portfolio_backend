const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    speak: { type: Number, default: 0, min: 0, max: 100 },
    read: { type: Number, default: 0, min: 0, max: 100 },
    write: { type: Number, default: 0, min: 0, max: 100 },
    percentage: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
