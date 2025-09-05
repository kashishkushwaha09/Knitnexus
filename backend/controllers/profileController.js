const { ManufacturerProfile, WorkerProfile } = require('../models');
const { AppError } = require('../utils/appError');

// Create or update manufacturer profile
exports.createOrUpdateManufacturerProfile = async (req, res, next) => {
  try {
    if (req.user.role !== "manufacturer") {
      return next(new AppError("Only manufacturers can create or update a profile", 403));
    }

    const { factory_name, machinery, daily_capacity, location } = req.body;

    let profile = await ManufacturerProfile.findOne({
      where: { userId: req.user.id },
    });

    if (profile) {

      profile.factory_name = factory_name || profile.factory_name;
      profile.machinery = machinery || profile.machinery;
      profile.daily_capacity = daily_capacity || profile.daily_capacity;
      profile.location = location || profile.location;

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
    }
    profile = await ManufacturerProfile.create({
      factory_name,
      machinery,
      daily_capacity,
      location,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Manufacturer profile created successfully",
      profile,
    });
  } catch (err) {
    next(err);
  }
};


// Worker Profile (Create or Update)
exports.createOrUpdateWorkerProfile = async (req, res, next) => {
  try {
    if (req.user.role !== "worker") {
      return next(new AppError("Only workers can create/update a profile", 403));
    }

    const { skills, work_type, experience_years } = req.body;
    let profile = await WorkerProfile.findOne({ where: { userId: req.user.id } });

    if (profile) {

      await profile.update({ skills, work_type, experience_years });

      return res.status(200).json({
        success: true,
        message: "Worker profile updated successfully",
        profile,
      });
    }

    // Create new profile
    profile = await WorkerProfile.create({
      skills,
      work_type,
      experience_years,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Worker profile created successfully",
      profile,
    });
  } catch (err) {
    next(err);
  }
};
