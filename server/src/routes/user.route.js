import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { getUsers } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', protect, admin, getUsers);

export default userRouter;
