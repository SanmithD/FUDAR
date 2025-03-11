import staffVehicleModel from "../models/staff.model.js";


export const staffVehicleController = {
  // Create a new staff vehicle
  createStaffVehicle: async (req, res) => {
    try {
      const {
        vehicleType,
        vehicleNumber,
        status
      } = req.body;

      // Validate required fields
      if (!vehicleType || !vehicleNumber) {
        return res.status(400).json({
          success: false,
          message: 'Vehicle type and number are required'
        });
      }

      // Check if files were uploaded
      if (!req.files) {
        return res.status(400).json({
          success: false,
          message: 'All vehicle images and documents are required'
        });
      }

      // Get file paths from multer
      const vehicleImageFront = req.files['vehicleImage[front]']?.[0]?.path;
      const vehicleImageBack = req.files['vehicleImage[back]']?.[0]?.path;
      const vehicleImageSide = req.files['vehicleImage[side]']?.[0]?.path;
      const staffVehicleRC = req.files['staffVehicleRC']?.[0]?.path;
      const staffVehicleEmission = req.files['staffVehicleEmission']?.[0]?.path;
      const staffVehicleInsurance = req.files['staffVehicleInsurance']?.[0]?.path;

      // Validate all required files
      if (!vehicleImageFront || !vehicleImageBack || !vehicleImageSide || 
          !staffVehicleRC || !staffVehicleEmission || !staffVehicleInsurance) {
        return res.status(400).json({
          success: false,
          message: 'All vehicle images and documents are required'
        });
      }

      // Check if vehicle with same number already exists
      const existingVehicle = await staffVehicleModel.findOne({ vehicleNumber });
      if (existingVehicle) {
        return res.status(409).json({
          success: false,
          message: 'Vehicle with this number already exists'
        });
      }

      // Create new staff vehicle
      const newStaffVehicle = new staffVehicleModel({
        vehicleType,
        vehicleImage: [{
          front: vehicleImageFront,
          back: vehicleImageBack,
          side: vehicleImageSide
        }],
        vehicleNumber,
        status: status || 'available',
        staffVehicleRC,
        staffVehicleEmission,
        staffVehicleInsurance
      });

      await newStaffVehicle.save();

      return res.status(201).json({
        success: true,
        message: 'Staff vehicle created successfully',
        vehicle: newStaffVehicle
      });
    } catch (error) {
      console.error('Create Staff Vehicle Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create staff vehicle',
        error: error.message
      });
    }
  },

  // Get all staff vehicles
  getAllStaffVehicles: async (req, res) => {
    try {
      const vehicles = await staffVehicleModel.find();
      
      return res.status(200).json({
        success: true,
        count: vehicles.length,
        vehicles
      });
    } catch (error) {
      console.error('Get All Staff Vehicles Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch staff vehicles',
        error: error.message
      });
    }
  },

  // Get staff vehicle by ID
  getStaffVehicleById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const vehicle = await staffVehicleModel.findById(id);
      
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Staff vehicle not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        vehicle
      });
    } catch (error) {
      console.error('Get Staff Vehicle Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch staff vehicle',
        error: error.message
      });
    }
  },

  // Update staff vehicle
  updateStaffVehicle: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
      
      // Check if vehicle exists
      const vehicle = await staffVehicleModel.findById(id);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Staff vehicle not found'
        });
      }
      
      // Check if files were uploaded and update accordingly
      if (req.files) {
        // Update vehicle images if provided
        if (req.files['vehicleImage[front]'] || req.files['vehicleImage[back]'] || req.files['vehicleImage[side]']) {
          const vehicleImage = [...vehicle.vehicleImage];
          
          if (req.files['vehicleImage[front]']?.[0]?.path) {
            vehicleImage[0].front = req.files['vehicleImage[front]'][0].path;
          }
          
          if (req.files['vehicleImage[back]']?.[0]?.path) {
            vehicleImage[0].back = req.files['vehicleImage[back]'][0].path;
          }
          
          if (req.files['vehicleImage[side]']?.[0]?.path) {
            vehicleImage[0].side = req.files['vehicleImage[side]'][0].path;
          }
          
          updateData.vehicleImage = vehicleImage;
        }
        
        // Update documents if provided
        if (req.files['staffVehicleRC']?.[0]?.path) {
          updateData.staffVehicleRC = req.files['staffVehicleRC'][0].path;
        }
        
        if (req.files['staffVehicleEmission']?.[0]?.path) {
          updateData.staffVehicleEmission = req.files['staffVehicleEmission'][0].path;
        }
        
        if (req.files['staffVehicleInsurance']?.[0]?.path) {
          updateData.staffVehicleInsurance = req.files['staffVehicleInsurance'][0].path;
        }
      }
      
      // Check for duplicate vehicle number if it's being updated
      if (updateData.vehicleNumber && updateData.vehicleNumber !== vehicle.vehicleNumber) {
        const duplicate = await staffVehicleModel.findOne({ 
          vehicleNumber: updateData.vehicleNumber,
          _id: { $ne: id }
        });
        
        if (duplicate) {
          return res.status(409).json({
            success: false,
            message: 'Another vehicle with this number already exists'
          });
        }
      }
      
      // Update vehicle
      const updatedVehicle = await staffVehicleModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      return res.status(200).json({
        success: true,
        message: 'Staff vehicle updated successfully',
        vehicle: updatedVehicle
      });
    } catch (error) {
      console.error('Update Staff Vehicle Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update staff vehicle',
        error: error.message
      });
    }
  },

  // Delete staff vehicle
  deleteStaffVehicle: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedVehicle = await staffVehicleModel.findByIdAndDelete(id);
      
      if (!deletedVehicle) {
        return res.status(404).json({
          success: false,
          message: 'Staff vehicle not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Staff vehicle deleted successfully'
      });
    } catch (error) {
      console.error('Delete Staff Vehicle Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete staff vehicle',
        error: error.message
      });
    }
  },
  
  // Update vehicle status
  updateVehicleStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['available', 'unavailable'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Valid status (available/unavailable) is required'
        });
      }
      
      const vehicle = await staffVehicleModel.findById(id);
      
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: 'Staff vehicle not found'
        });
      }
      
      vehicle.status = status;
      await vehicle.save();
      
      return res.status(200).json({
        success: true,
        message: `Vehicle status updated to ${status}`,
        vehicle
      });
    } catch (error) {
      console.error('Update Vehicle Status Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update vehicle status',
        error: error.message
      });
    }
  },
  
  // Get available vehicles
  getAvailableVehicles: async (req, res) => {
    try {
      const vehicles = await staffVehicleModel.find({ status: 'available' });
      
      return res.status(200).json({
        success: true,
        count: vehicles.length,
        vehicles
      });
    } catch (error) {
      console.error('Get Available Vehicles Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch available vehicles',
        error: error.message
      });
    }
  }
};