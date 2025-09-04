const { Job } = require('../models');
const { AppError } = require('../utils/appError');

// Create Job
exports.createJob = async (req, res, next) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return next(new AppError('Only manufacturers can post jobs', 403));
    }

    const { title, description, duration, pay_per_day } = req.body;

    const job = await Job.create({
      title,
      description,
      duration,
      pay_per_day,
      manufacturerId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Jobs
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll();
    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    next(err);
  }
};

// Get Job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return next(new AppError('Job not found', 404));

    res.json({ success: true, job });
  } catch (err) {
    next(err);
  }
};
