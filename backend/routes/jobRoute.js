const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { createJob, getJobs, getJobById } = require('../controllers/jobController');

// Routes
router.post('/', authUser, createJob);
router.get('/', getJobs);           
router.get('/:id', getJobById); 

module.exports = router;
