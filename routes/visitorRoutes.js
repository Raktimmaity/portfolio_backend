const express = require("express");
const { recordVisit } = require("../controllers/visitorController");

const router = express.Router();

router.post("/", recordVisit);

module.exports = router;
