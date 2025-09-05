const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { AppError } = require('../utils/appError');
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return next(new AppError("Email already registered", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    next(new AppError("Signup failed", 500));
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new AppError("Invalid credentials", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 400));
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token,role: user.role });
  } catch (error) {
    next(error);
  }
};