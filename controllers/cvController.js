const Cv = require("../models/Cv");

const getCv = async (req, res) => {
  try {
    let cv = await Cv.findOne();
    if (!cv) cv = await Cv.create({});
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCv = async (req, res) => {
  try {
    const update = {
      fileUrl: req.body.fileUrl ?? "",
      fileName: req.body.fileName ?? "",
      isActive: typeof req.body.isActive === "boolean" ? req.body.isActive : true,
    };
    const cv = await Cv.findOneAndUpdate({}, update, { new: true, upsert: true });
    res.json({ message: "CV updated", cv });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCv, updateCv };
