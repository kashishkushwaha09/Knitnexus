const { ManufacturerProfile, WorkerProfile } = require('../models');
const { AppError } = require('../utils/appError');

// Manufacturer Profile
exports.createManufacturerProfile = async (req, res, next) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return next(new AppError('Only manufacturers can create a profile', 403));
    }

    const { factory_name, machinery, daily_capacity, location } = req.body;

    const profile = await ManufacturerProfile.create({
      factory_name,
      machinery,
      daily_capacity,
      location,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Manufacturer profile created successfully',
      profile,
    });
  } catch (err) {
    next(err);
  }
};

// Worker Profile
exports.createWorkerProfile = async (req, res, next) => {
  try {
    if (req.user.role !== 'worker') {
      return next(new AppError('Only workers can create a profile', 403));
    }

    const { skills, work_type, experience_years } = req.body;

    const profile = await WorkerProfile.create({
      skills,
      work_type,
      experience_years,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Worker profile created successfully',
      profile,
    });
  } catch (err) {
    next(err);
  }
};
