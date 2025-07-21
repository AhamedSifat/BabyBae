import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists with this email');
  }
  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: [],
  });

  // If user creation is successful, return user data
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      addresses: user.addresses,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      addresses: user.addresses || [],
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
