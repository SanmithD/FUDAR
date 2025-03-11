// routes/bookingRoutes.js
import express from 'express';
import { bookingController } from '../controllers/book.controllers.js';
import upload from '../middlewares/multer.middleware.js';

const bookRouter = express.Router();

// Driver routes
bookRouter.post('/driver/book/:staffVehicleId', 
  upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'back', maxCount: 1 },
    { name: 'side', maxCount: 1 }
  ]),
  bookingController.createBooking
);

bookRouter.get('/driver/bookings/:driverId', bookingController.getDriverBookings);

// Staff routes
bookRouter.patch('/staff/bookings/:bookingId/monthly-salary', bookingController.updateMonthlySalary);
bookRouter.get('/staff/bookings/all', bookingController.getAllBookings);
bookRouter.patch('/staff/bookings/:bookingId/complete', bookingController.completeBooking);

export default bookRouter;