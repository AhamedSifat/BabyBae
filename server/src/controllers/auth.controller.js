import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exists with this email' });
  }
  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: [],
  });

  if (!user) {
    return res.status(500).json({ message: 'User registration failed' });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    addresses: user.addresses || [],
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email });

  const isMatch = user && (await user.matchPassword(password));
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    addresses: user.addresses || [],
    token: generateToken(user),
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully', success: true });
});
