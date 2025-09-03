const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('../utils/appError'); 

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return next(new AppError('No token provided', 401));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(new AppError('Invalid token format', 401));
    }

     let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(new AppError('Invalid or expired token', 401));
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
       return next(new AppError('User not found', 401));
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    next(err); 
  }
};

module.exports = authUser;
