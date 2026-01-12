const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cv", cvSchema);
