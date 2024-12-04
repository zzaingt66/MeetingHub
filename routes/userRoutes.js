/* import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, updateUserProfile);

export default router; */