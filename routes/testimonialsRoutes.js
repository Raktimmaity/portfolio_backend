const express = require("express");
const {
  getApprovedTestimonials,
  createTestimonial,
} = require("../controllers/testimonialsController");

const router = express.Router();

router.get("/", getApprovedTestimonials);
router.post("/", createTestimonial);

module.exports = router;
