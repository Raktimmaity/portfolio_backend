const express = require("express");
const { getPublicProjects } = require("../controllers/projectsController");

const router = express.Router();

router.get("/", getPublicProjects);

module.exports = router;
