const { Application, Job, User } = require("../models");
const { AppError } = require("../utils/appError");
const {sendWhatsAppNotification}=require("../utils/twilio");

exports.applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const workerId = req.user.id; 
  
    const job = await Job.findByPk(jobId, { include: User });
    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    // Prevent duplicate application
    const existingApp = await Application.findOne({ where: { jobId, workerId } });
    if (existingApp) {
      return next(new AppError("You already applied to this job", 400));
    }

    // Save application
    const application = await Application.create({ jobId, workerId });

    // Send WhatsApp notification
    await sendWhatsAppNotification(job.User.phone, req.user.name, job.title);

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (err) {
    next(err);
  }
};
exports.appliedJobs=async (req, res, next) => {
  try {
    if (req.user.role !== "worker") {
      return next(new AppError("Only workers can access applied jobs", 403));
      
    }

    const applications = await Application.findAll({
      where: { workerId: req.user.id },
      attributes: ["jobId"],
    });

    const appliedJobs = applications.map(app => app.jobId);

    res.json({ success: true, appliedJobs });
  } catch (err) {
    next(err);
  }
}
exports.getApplications = async (req, res, next) => {
  try {
    const applications = await Application.findAll({
      include: [
        { model: Job, attributes: ["title", "pay_per_day"] },
        { model: User, attributes: ["name", "role"] }
      ]
    });
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Application.destroy({ where: { jobId:id } });

    if (!deleted) {
      return next(new AppError("Application not found", 404));
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    next(err);
  }
};