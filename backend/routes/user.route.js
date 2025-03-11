import { Router } from 'express';
import userProfile, { getUserProfile, requestOTP, verifyOTP } from '../controllers/user.controllers.js';
import userMiddleware from '../middlewares/user.middleware.js';
const router = Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

router.get('/driverProfile/:id', userMiddleware, getUserProfile);
router.get('/profile', userProfile);

export default router;