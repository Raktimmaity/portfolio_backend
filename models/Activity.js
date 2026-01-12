const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, default: "" },
    date: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
