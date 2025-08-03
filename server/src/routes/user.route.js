import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getUsers } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', protect, getUsers);

export default userRouter;
