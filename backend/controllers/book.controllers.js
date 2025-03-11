// controllers/bookingController.js
import { bookModel } from '../models/book.model.js';
import { driverModel } from '../models/driver.model.js';
import staffVehicleModel from '../models/staff.model.js';

export const bookingController = {
  // Driver books a vehicle
  createBooking: async (req, res) => {
    try {
      const { driverId } = req.body;
      const { staffVehicleId } = req.params;
      
      // Check vehicle availability
      const vehicle = await staffVehicleModel.findById(staffVehicleId);
      if (!vehicle || vehicle.status !== 'available') {
        return res.status(400).json({
          success: false,
          message: 'Vehicle not available for booking'
        });
      }

      // Check driver existence
      const driver = await driverModel.findById(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'Driver not found'
        });
      }

      // Handle file uploads
      const vehicleImages = {
        front: req.files['front'][0].path,
        back: req.files['back'][0].path,
        side: req.files['side'][0].path
      };

      // Create new booking
      const newBooking = new bookModel({
        staffVehicle: staffVehicleId,
        driver: driverId,
        vehicleImages
      });

      // Update vehicle status
      vehicle.status = 'unavailable';
      await vehicle.save();
      await newBooking.save();

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking: newBooking
      });

    } catch (error) {
      console.error('Create Booking Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create booking',
        error: error.message
      });
    }
  },

  // Staff updates monthly salary
  updateMonthlySalary: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { monthlySalary } = req.body;

      const updatedBooking = await bookModel.findByIdAndUpdate(
        bookingId,
        { monthlySalary },
        { new: true }
      ).populate('driver staffVehicle');

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      res.json({
        success: true,
        message: 'Monthly salary updated successfully',
        booking: updatedBooking
      });

    } catch (error) {
      console.error('Update Monthly Salary Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update monthly salary',
        error: error.message
      });
    }
  },

  // Staff views all bookings
  getAllBookings: async (req, res) => {
    try {
      const bookings = await bookModel.find()
        .populate('staffVehicle')
        .populate('driver');

      res.json({
        success: true,
        count: bookings.length,
        bookings
      });

    } catch (error) {
      console.error('Get All Bookings Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch bookings',
        error: error.message
      });
    }
  },

  // Driver views their bookings
  getDriverBookings: async (req, res) => {
    try {
      const { driverId } = req.params;
      const bookings = await bookModel.find({ driver: driverId })
        .populate('staffVehicle');

      res.json({
        success: true,
        count: bookings.length,
        bookings
      });

    } catch (error) {
      console.error('Get Driver Bookings Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch driver bookings',
        error: error.message
      });
    }
  },

  // Complete booking and make vehicle available
  completeBooking: async (req, res) => {
    try {
      const { bookingId } = req.params;

      const booking = await bookModel.findByIdAndUpdate(
        bookingId,
        { status: 'completed' },
        { new: true }
      ).populate('staffVehicle');

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      // Update vehicle status
      await staffVehicleModel.findByIdAndUpdate(
        booking.staffVehicle._id,
        { status: 'available' }
      );

      res.json({
        success: true,
        message: 'Booking marked as completed',
        booking
      });

    } catch (error) {
      console.error('Complete Booking Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to complete booking',
        error: error.message
      });
    }
  }
};