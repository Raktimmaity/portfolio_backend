const About = require("../models/About");

const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAbout = async (req, res) => {
  try {
    const update = {
      professionalHeading: req.body.professionalHeading ?? "",
      websiteName: req.body.websiteName ?? "",
      subHeading: req.body.subHeading ?? "",
      shortDescription: req.body.shortDescription ?? "",
      longDescription: req.body.longDescription ?? "",
    };
    const about = await About.findOneAndUpdate({}, update, { new: true, upsert: true });
    res.json({ message: "About updated", about });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAbout, updateAbout };
