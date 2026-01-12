const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    professionalHeading: { type: String, default: "" },
    websiteName: { type: String, default: "" },
    subHeading: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    longDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
