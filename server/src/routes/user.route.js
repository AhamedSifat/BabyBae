import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', protect, admin, getUsers);
userRouter.post('/', protect, admin, createUser);
userRouter.put('/:id', protect, admin, updateUser);
userRouter.delete('/:id', protect, admin, deleteUser);
export default userRouter;
