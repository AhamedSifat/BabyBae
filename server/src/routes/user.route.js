import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { createUser, getUsers } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', protect, admin, getUsers);
userRouter.post('/', protect, admin, createUser);
export default userRouter;
