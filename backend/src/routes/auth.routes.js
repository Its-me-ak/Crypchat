import express from 'express';
import { forgotPassword, getUser, login, logout, onboarding, resetPassword, signup } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();  

router.post('/login', login);
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/onboarding', protectedRoute, onboarding);
router.get('/me', protectedRoute, getUser)

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;