import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user._id).select('-password');
  if (!admin) {
    return res.status(404).json({ message: 'Admin not found' });
  }

  const users = await User.find({}).select('-password');
  res.json(users);
});
