import express from 'express';
import { staffVehicleController } from '../controllers/staffVehicle.controllers.js';
import upload from '../middlewares/multer.middleware.js';

const staffVehicleRouter = express.Router();

const staffVehicleUpload = upload.fields([
  { name: 'vehicleImage[front]', maxCount: 1 },
  { name: 'vehicleImage[back]', maxCount: 1 },
  { name: 'vehicleImage[side]', maxCount: 1 },
  { name: 'staffVehicleRC', maxCount: 1 },
  { name: 'staffVehicleEmission', maxCount: 1 },
  { name: 'staffVehicleInsurance', maxCount: 1 }
]);

staffVehicleRouter.post('/create', staffVehicleUpload, staffVehicleController.createStaffVehicle);
staffVehicleRouter.get('/all', staffVehicleController.getAllStaffVehicles);
staffVehicleRouter.get('/available', staffVehicleController.getAvailableVehicles);
staffVehicleRouter.get('/viewStaffVehicle/:id', staffVehicleController.getStaffVehicleById);
staffVehicleRouter.put('/staffVehicleUpdate/:id', staffVehicleUpload, staffVehicleController.updateStaffVehicle);
staffVehicleRouter.patch('/:id/status', staffVehicleController.updateVehicleStatus);
staffVehicleRouter.delete('/deleteStaffVehicle/:id', staffVehicleController.deleteStaffVehicle);

export default staffVehicleRouter;