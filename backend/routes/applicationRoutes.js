const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const authorizeRole = require("../middlewares/authorizeRole");
const { applyToJob,getApplications,deleteApplication} = require("../controllers/applicationController");

// Worker applies to a job
router.post(
  "/apply",
  authUser,            // must be logged in
  authorizeRole("worker"), // only workers allowed
  applyToJob
);
router.get("/", getApplications);                
router.delete("/:id", deleteApplication);   

module.exports = router;
