import express from 'express';
import { updateUser, userLogin, userProfile, userSignup } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile', userProfile);
router.put('/update/:id', updateUser);

export default router