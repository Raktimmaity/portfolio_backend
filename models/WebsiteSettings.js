const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
  {
    favicon: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
    seoOgTitle: { type: String, default: "" },
    seoOgDescription: { type: String, default: "" },
    seoOgImage: { type: String, default: "" },
    seoTwitterCard: { type: String, default: "summary_large_image" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteSettings", websiteSettingsSchema);
