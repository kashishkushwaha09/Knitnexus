const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { createManufacturerProfile, createWorkerProfile } = require('../controllers/profileController');

// Protected routes
router.post('/manufacturer', authUser, createManufacturerProfile);
router.post('/worker', authUser, createWorkerProfile);

module.exports = router;
