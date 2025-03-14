import { bookModel } from "../models/book.model.js";
import { driverModel } from "../models/driver.model.js";
import staffVehicleModel from "../models/staff.model.js";

export const staffAssignVehicle = async (req, res) => {
    try {
      const { vehicleId, driverId } = req.body;
  
      if (!vehicleId || !driverId) {
        return res.status(400).json({
          success: false,
          message: "Vehicle ID and Driver ID are required",
        });
      }
  
      const vehicleExists = await staffVehicleModel.findById(vehicleId);
      const driverExists = await driverModel.findById(driverId);
  
      if (!vehicleExists) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }
      if (!driverExists) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }
  
      const existingBooking = await bookModel.findOne({
        staffVehicle: vehicleId,
        status: 'active'
      });
  
      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "Vehicle is already assigned to another driver",
        });
      }
  
      let frontImage = "", backImage = "", sideImage = "";
      
      if (vehicleExists.vehicleImage) {
        if (Array.isArray(vehicleExists.vehicleImage) && vehicleExists.vehicleImage.length > 0) {
          const imageObj = vehicleExists.vehicleImage[0];
          frontImage = imageObj.front || "undefined";
          backImage = imageObj.back || "undefined";
          sideImage = imageObj.side || "undefined";
        } else if (typeof vehicleExists.vehicleImage === 'string') {
          frontImage = backImage = sideImage = vehicleExists.vehicleImage;
        }
      }
  
      const newBooking = new bookModel({
        staffVehicle: vehicleId,
        driver: driverId,
        bookingDate: new Date(),
        vehicleImages: {
          front: frontImage,
          back: backImage,
          side: sideImage
        },
        monthlySalaries: [{
          month: new Date().toLocaleString('default', { month: 'long' }),
          amount: 0 
        }],
        status: 'active'
      });
  
      await newBooking.save();
  
      await staffVehicleModel.findByIdAndUpdate(
        vehicleId,
        { status: 'assigned' },
        { new: true }
      );
  
      await driverModel.findByIdAndUpdate(
        driverId,
        { vehicle: vehicleId, status: 'assigned' },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Vehicle assigned successfully",
        booking: newBooking
      });
    } catch (error) {
      console.error("Error in staffAssignVehicle:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };