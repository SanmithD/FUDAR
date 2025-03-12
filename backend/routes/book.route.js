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

bookRouter.get('/driver/bookings/:driver', bookingController.getDriverBookings);
// bookRouter.get('/driver/bookings/:staffVehicle', bookingController.getDriverBookings);

// Staff routes
bookRouter.patch('/staff/bookings/:driver/monthly-salary', bookingController.updateMonthlySalary);
bookRouter.get('/staff/bookings/all', bookingController.getAllBookings);
// bookRouter.patch('/staff/bookings/:driver/complete', bookingController.completeBooking);
bookRouter.put("/completeBooking/:driverId", bookingController.completeBooking);

export default bookRouter;