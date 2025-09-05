const { AppError } = require("../utils/appError");

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return next(new AppError("Forbidden: Access denied", 403));
    }
    next();
  };
};

module.exports = authorizeRole;
