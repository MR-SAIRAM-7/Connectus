// backend/controllers/userController.js
import asyncHandler from "express-async-handler";
import validator from "validator";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * Helper: standardized success response
 * @param {object} res - express response
 * @param {number} statusCode
 * @param {string} message
 * @param {object} data
 */
const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body ?? {};

  // Basic validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields (username, email, password) are required.");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address.");
  }

  if (typeof password !== "string" || password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long.");
  }

  // Prevent duplicate users by email or username
  const existingByEmail = await User.findOne({ email });
  if (existingByEmail) {
    res.status(400);
    throw new Error("A user with this email already exists.");
  }

  const existingByUsername = await User.findOne({ username });
  if (existingByUsername) {
    res.status(400);
    throw new Error("This username is already taken.");
  }

  // Create user - password hashing handled in model pre('save')
  const user = await User.create({ username, email, password });

  if (!user) {
    res.status(500);
    throw new Error("Failed to create user.");
  }

  // Return user info + token (stateless JWT)
  const token = generateToken(user._id);

  return sendSuccess(res, 201, "User registered successfully.", {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token,
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address.");
  }

  const user = await User.findOne({ email });

  // matchPassword is defined on the model (bcrypt.compare)
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  const token = generateToken(user._id);

  return sendSuccess(res, 200, "Login successful.", {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token,
  });
});

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private
 *
 * Requires `protect` middleware to set req.user = { _id, ... }
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error("Not authorized.");
  }

  const user = await User.findById(userId).select("-password -__v");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  return sendSuccess(res, 200, "User profile fetched.", { user });
});

/**
 * Logout endpoint (if you use cookies). If stateless JWT, client just removes token.
 * @route POST /api/users/logout
 * @access Public (or Protected if you want)
 */

export const logoutUser = asyncHandler(async (req, res) => {
  // If you use http-only cookie for tokens, clear it here. Otherwise, client should delete token.
  // res.clearCookie('token', { path: '/' });
  return sendSuccess(res, 200, "Logged out.");
});
