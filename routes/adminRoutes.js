const express = require("express");
const { getAdminProfile, updateAdminProfile } = require("../controllers/adminController");
const { getWebsiteSettings, updateWebsiteSettings } = require("../controllers/websiteSettingsController");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillsController");
const { getLanguages, createLanguage, updateLanguage, deleteLanguage } = require("../controllers/languagesController");
const { getCv, updateCv } = require("../controllers/cvController");
const { getVisitorStats } = require("../controllers/visitorController");
const { getResumeEntries, createResumeEntry, updateResumeEntry, deleteResumeEntry } = require("../controllers/resumeController");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectsController");
const { getActivities, createActivity, updateActivity, deleteActivity } = require("../controllers/activitiesController");
const { getCoActivities, createCoActivity, updateCoActivity, deleteCoActivity } = require("../controllers/coActivitiesController");
const { getStrengthsInterests, createStrengthInterest, updateStrengthInterest, deleteStrengthInterest } = require("../controllers/strengthsInterestsController");
const { getContactMessages, deleteContactMessage } = require("../controllers/contactController");
const {
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
} = require("../controllers/testimonialsController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router
  .route("/profile")
  .get(authMiddleware, getAdminProfile)
  .put(authMiddleware, updateAdminProfile);

router
  .route("/site-settings")
  .get(authMiddleware, getWebsiteSettings)
  .put(authMiddleware, updateWebsiteSettings);

router
  .route("/about")
  .get(authMiddleware, getAbout)
  .put(authMiddleware, updateAbout);

router
  .route("/skills")
  .get(authMiddleware, getSkills)
  .post(authMiddleware, createSkill);

router
  .route("/skills/:id")
  .put(authMiddleware, updateSkill)
  .delete(authMiddleware, deleteSkill);

router
  .route("/languages")
  .get(authMiddleware, getLanguages)
  .post(authMiddleware, createLanguage);

router
  .route("/languages/:id")
  .put(authMiddleware, updateLanguage)
  .delete(authMiddleware, deleteLanguage);

router
  .route("/cv")
  .get(authMiddleware, getCv)
  .put(authMiddleware, updateCv);

router.get("/visitors", authMiddleware, getVisitorStats);

router
  .route("/resume")
  .get(authMiddleware, getResumeEntries)
  .post(authMiddleware, createResumeEntry);

router
  .route("/resume/:id")
  .put(authMiddleware, updateResumeEntry)
  .delete(authMiddleware, deleteResumeEntry);

router
  .route("/projects")
  .get(authMiddleware, getProjects)
  .post(authMiddleware, createProject);

router
  .route("/projects/:id")
  .put(authMiddleware, updateProject)
  .delete(authMiddleware, deleteProject);

router
  .route("/activities")
  .get(authMiddleware, getActivities)
  .post(authMiddleware, createActivity);

router
  .route("/activities/:id")
  .put(authMiddleware, updateActivity)
  .delete(authMiddleware, deleteActivity);

router
  .route("/co-activities")
  .get(authMiddleware, getCoActivities)
  .post(authMiddleware, createCoActivity);

router
  .route("/co-activities/:id")
  .put(authMiddleware, updateCoActivity)
  .delete(authMiddleware, deleteCoActivity);

router
  .route("/strengths-interests")
  .get(authMiddleware, getStrengthsInterests)
  .post(authMiddleware, createStrengthInterest);

router
  .route("/strengths-interests/:id")
  .put(authMiddleware, updateStrengthInterest)
  .delete(authMiddleware, deleteStrengthInterest);

router
  .route("/contact-messages")
  .get(authMiddleware, getContactMessages);

router
  .route("/contact-messages/:id")
  .delete(authMiddleware, deleteContactMessage);

router
  .route("/testimonials")
  .get(authMiddleware, getAllTestimonials);

router
  .route("/testimonials/:id")
  .put(authMiddleware, updateTestimonialStatus)
  .delete(authMiddleware, deleteTestimonial);

module.exports = router;
