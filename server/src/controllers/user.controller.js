import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, addresses } = req.body;

  // Check for existing user
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: addresses || [],
  });

  if (user) {
    const { password, ...userData } = user.toObject();
    res.status(201).json(userData);
  } else {
    res.status(500).json({ message: 'User creation failed' });
  }
});
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({ message: 'User removed successfully' });
});
