const Admin = require("../models/User");
const bcrypt = require("bcryptjs");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.phone = req.body.phone ?? admin.phone;
    admin.birthday = req.body.birthday ?? admin.birthday;
    admin.address = req.body.address ?? admin.address;
    admin.country = req.body.country ?? admin.country;
    admin.company = req.body.company ?? admin.company;
    admin.job = req.body.job ?? admin.job;
    admin.professionTitles = req.body.professionTitles ?? admin.professionTitles;
    admin.avatar = req.body.avatar ?? admin.avatar;
    admin.coverPhoto = req.body.coverPhoto ?? admin.coverPhoto;
    admin.socialFacebook = req.body.socialFacebook ?? admin.socialFacebook;
    admin.socialInstagram = req.body.socialInstagram ?? admin.socialInstagram;
    admin.socialLinkedIn = req.body.socialLinkedIn ?? admin.socialLinkedIn;
    admin.socialGitHub = req.body.socialGitHub ?? admin.socialGitHub;
    admin.socialSkype = req.body.socialSkype ?? admin.socialSkype;
    admin.socialTwitter = req.body.socialTwitter ?? admin.socialTwitter;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(req.body.password, salt);
    }

    const updated = await admin.save();
    res.json({ message: "Profile updated", admin: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminProfile, updateAdminProfile };
