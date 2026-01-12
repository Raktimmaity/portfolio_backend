const mongoose = require("mongoose");

const strengthInterestSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ["Strengths", "Interests"], required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StrengthInterest", strengthInterestSchema);
