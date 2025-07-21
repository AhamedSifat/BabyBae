import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logout,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', protect, getUserProfile);
authRouter.get('/logout', protect, logout);
export default authRouter;
