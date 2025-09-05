const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { createOrUpdateManufacturerProfile, createOrUpdateWorkerProfile } = require('../controllers/profileController');

// Protected routes
router.post('/manufacturer', authUser, createOrUpdateManufacturerProfile);
router.post('/worker', authUser, createOrUpdateWorkerProfile);

module.exports = router;
