import express from 'express';
import { getUser, login, logout, onboarding, signup } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { apiResponse } from '../utils/apiResponse.js';

const router = express.Router();  

router.post('/login', login);
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/onboarding', protectedRoute, onboarding);
router.get('/me', protectedRoute, getUser)

export default router;