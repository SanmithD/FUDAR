import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { bookModel } from "../models/book.model.js";
import { driverModel } from "../models/driver.model.js";
import staffVehicleModel from "../models/staff.model.js";

export const bookingController = {
  createBooking: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;
    try {
      const { staffVehicleId } = req.params;

      const vehicle = await staffVehicleModel.findById(staffVehicleId);
      if (!vehicle || vehicle.status !== "available") {
        return res.status(400).json({
          success: false,
          message: "Vehicle not available for booking",
        });
      }

      const { id } = jwt.verify(token, JWT);

      const driver = await driverModel.findById(id);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      const vehicleImages = {
        front: req.files["front"][0].path,
        back: req.files["back"][0].path,
        side: req.files["side"][0].path,
      };

      const newBooking = new bookModel({
        staffVehicle: staffVehicleId,
        driver: id,
        vehicleImages,
      });

      vehicle.status = "unavailable";
      await vehicle.save();
      driver.status = "unavailable";
      await driver.save();
      await newBooking.save();

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking: newBooking,
      });
    } catch (error) {
      console.error("Create Booking Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create booking",
        error: error.message,
      });
    }
  },

  updateMonthlySalary: async (req, res) => {
    try {
      const { driver } = req.params;
      const { month, amount } = req.body;

      const updatedBooking = await bookModel
        .findOneAndUpdate(
          { driver },
          {
            $push: {
              monthlySalaries: {
                month,
                amount,
              },
            },
          },
          { new: true }
        )
        .populate("driver staffVehicle");

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.json({
        success: true,
        message: "Monthly salary updated successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      console.error("Update Monthly Salary Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update monthly salary",
        error: error.message,
      });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await bookModel
        .find()
        .populate("staffVehicle")
        .populate("driver");

      res.json({
        success: true,
        count: bookings.length,
        bookings,
      });
    } catch (error) {
      console.error("Get All Bookings Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings",
        error: error.message,
      });
    }
  },

  getDriverBookings: async (req, res) => {
    try {
      const { driver } = req.params;
      const bookings = await bookModel
        .find({ driver: driver })
        .populate("staffVehicle");

      res.json({
        success: true,
        count: bookings.length,
        bookings,
      });
    } catch (error) {
      console.error("Get Driver Bookings Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch driver bookings",
        error: error.message,
      });
    }
  },

  completeBooking: async (req, res) => {
    try {
      const { driverId } = req.params;
  
      const booking = await bookModel.findOneAndUpdate(
        { driver: driverId, status: "active" },
        { status: "completed" },
        { new: true }
      ).populate("staffVehicle driver");
  
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Active booking not found",
        });
      }
  
      await driverModel.findByIdAndUpdate(driverId, {
        status: "available"
      });
  
      await staffVehicleModel.findByIdAndUpdate(booking.staffVehicle._id, {
        status: "available"
      });
  
      res.json({
        success: true,
        message: "Booking completed and statuses updated",
        booking,
      });
    } catch (error) {
      console.error("Complete Booking Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to complete booking",
        error: error.message,
      });
    }
  },

  deleteCompleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
  
      const booking = await bookModel.findOneAndDelete(id);
  
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Active booking not found",
        });
      }
  
      await driverModel.findByIdAndUpdate(driverId, {
        status: "available"
      });
  
      await staffVehicleModel.findByIdAndUpdate(booking.staffVehicle._id, {
        status: "available"
      });
  
      res.json({
        success: true,
        message: "Booking Deleted and statuses updated",
        booking,
      });
    } catch (error) {
      console.error("Complete Booking Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to complete booking",
        error: error.message,
      });
    }
  },

  getActiveBookings : async (req, res) => {
  try {
    const activeBookings = await bookModel.find({ status: 'active' });
    res.status(200).json(activeBookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active bookings", error });
  }
},

  getOwnSalary : async(req, res) =>{

  }

};
