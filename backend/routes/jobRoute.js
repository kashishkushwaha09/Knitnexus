const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const authorizeRole = require("../middlewares/authorizeRole");
const { createJob, getJobs, getJobById } = require('../controllers/jobController');

// Routes
router.post('/', authUser,authorizeRole("manufacturer"), createJob);
router.get('/', getJobs);           
router.get('/:id', getJobById); 

module.exports = router;
