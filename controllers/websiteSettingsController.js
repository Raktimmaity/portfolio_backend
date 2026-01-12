const WebsiteSettings = require("../models/WebsiteSettings");

const getWebsiteSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) settings = await WebsiteSettings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateWebsiteSettings = async (req, res) => {
  try {
    const update = {
      favicon: req.body.favicon ?? "",
      seoTitle: req.body.seoTitle ?? "",
      seoDescription: req.body.seoDescription ?? "",
      seoKeywords: req.body.seoKeywords ?? "",
      seoOgTitle: req.body.seoOgTitle ?? "",
      seoOgDescription: req.body.seoOgDescription ?? "",
      seoOgImage: req.body.seoOgImage ?? "",
      seoTwitterCard: req.body.seoTwitterCard ?? "summary_large_image",
    };
    const settings = await WebsiteSettings.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
    });
    res.json({ message: "Settings updated", settings });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getWebsiteSettings, updateWebsiteSettings };
