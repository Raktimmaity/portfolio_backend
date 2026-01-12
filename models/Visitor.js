const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    fingerprint: { type: String, required: true },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

visitorSchema.index({ date: 1, fingerprint: 1 }, { unique: true });

module.exports = mongoose.model("Visitor", visitorSchema);
