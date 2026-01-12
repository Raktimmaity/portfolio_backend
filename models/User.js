const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin","merchandise","user"], default: "admin" },
  phone: { type: String, default: "" },
  birthday: { type: String, default: "" },
  address: { type: String, default: "" },
  country: { type: String, default: "" },
  company: { type: String, default: "" },
  job: { type: String, default: "" },
  professionTitles: { type: String, default: "" },
  avatar: { type: String, default: "" },
  coverPhoto: { type: String, default: "" },
  socialFacebook: { type: String, default: "" },
  socialInstagram: { type: String, default: "" },
  socialLinkedIn: { type: String, default: "" },
  socialGitHub: { type: String, default: "" },
  socialSkype: { type: String, default: "" },
  socialTwitter: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
