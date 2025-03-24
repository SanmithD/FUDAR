import express from 'express';
import { deleteStaff, getAllStaff, getAllUsers, getUserSalary, updateUser, userLogin, userProfile, userSignup } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile', userProfile);
router.get('/getAllStaff', getAllStaff);
router.put('/update/:id', updateUser);
router.get('/getAll', getAllUsers);
router.delete('/deleteStaff/:id', deleteStaff);
router.get('/getOwnSalary', getUserSalary);

export default router