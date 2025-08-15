import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import { cloudinary } from '../utils/cloudinary.js';

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

  // Handle avatar upload before creating user
  let avatarUrl = null;
  if (req.body.avatar) {
    try {
      const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'babybae/avatars',
        resource_type: 'auto',
      });
      avatarUrl = result.secure_url;
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({ message: 'Avatar upload failed' });
    }
  }

  // Create user with avatar URL if available
  const user = await User.create({
    name,
    email,
    password,
    role,
    addresses: addresses || [],
    avatar: avatarUrl, // Include avatar in initial creation
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

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, addresses } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json('User not found');
  }

  user.name = name;
  user.email = email;
  user.role = role;
  user.addresses = addresses || user.addresses;
  if (req.body.avatar && req.body.avatar !== user.avatar) {
    // Upload user to Cloudinary

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: 'babybae/avatars',
    });

    user.avatar = result.secure_url;
  }
  const updateUser = await user.save();
  const { password, ...userData } = updateUser.toObject();
  res.status(201).json(userData);
});
