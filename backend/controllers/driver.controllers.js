import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { driverModel } from "../models/driver.model.js";

const postDriverInfo = async (req, res) => {
  const {
    driverName,
    driverNumber,
    driverBankNumber,
    driverIFSC,
    driverBankAddress,
  } = req.body;
  const driverImage = req.files?.driverImage?.[0]?.path;
  const driverAdhaar = req.files?.driverAdhaar?.[0]?.path;
  const driverPan = req.files?.driverPan?.[0]?.path;
  const drivingLicence = req.files?.drivingLicence?.[0]?.path;

  if (
    !driverImage ||
    !driverName ||
    !driverNumber ||
    !driverAdhaar ||
    !driverPan ||
    !drivingLicence ||
    !driverBankNumber ||
    !driverIFSC ||
    !driverBankAddress
  ) {
    return res.status(400).json({
      success: false,
      message: "All driver fields are required",
    });
  }
  if (!driverNumber.primaryNumber || !driverNumber.secondaryNumber) {
    return res.status(400).json({
      success: false,
      message: "Both primary and secondary phone numbers are required",
    });
  }
  const existingDriver = await driverModel.findOne({
    $or: [
      { "driverNumber.primaryNumber": driverNumber.primaryNumber },
      { driverAdhaar: driverAdhaar },
      { driverPan: driverPan },
      { drivingLicence: drivingLicence },
      { driverBankNumber: driverBankNumber },
    ],
  });
  if (existingDriver) {
    return res.status(409).json({
      success: false,
      message: "Driver with these details already exists",
    });
  }
//   if (vehicle) {
//     const vehicleExists = await Vehicle.findById(vehicle);
//     if (!vehicleExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Vehicle not found",
//       });
//     }
//   }
  try {
    const newDriver = new driverModel({
      driverImage,
      driverName,
      driverNumber: [
        {
          primaryNumber: driverNumber.primaryNumber,
          secondaryNumber: driverNumber.secondaryNumber,
        },
      ],
      driverAdhaar,
      driverPan,
      drivingLicence,
      driverBankNumber,
      driverIFSC,
      driverBankAddress,
    //   vehicle,
    });
    await newDriver.save();

    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      driver: newDriver,
    });
  } catch (error) {
    console.error("Create Driver Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create driver",
      error: error.message,
    });
  }
};

const getAllDriverDetails = async(req, res) =>{
    try {
        const details = await driverModel.find();
        if(!details){
            return res.status(404).json({
                success: false,
                message: "Details not found"
            });
        };
        res.status(200).json({
            success: true,
            message: "All Drivers Details",
            details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
};

const getDriverById = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    };
    try {
        const details = await driverModel.findById(id);
        if(!details){
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver Details",
            details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const viewDriverInfo = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const { userId } = jwt.verify(token, JWT);
        if(!userId){
            return res.status(404).json({
                success: false,
                message: "Invalid id"
            });
        }
        const details = await driverModel.findById(userId);
        if(details){
            return res.status(404).json({
                success: false,
                message: "Details not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver Info"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const deleteDriverById = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    };
    try {
        const details = await driverModel.findByIdAndDelete(id);
        if(!details){
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver Details Deleted",
            details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const deleteDriverInfo = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
    try {
        const { userId } = jwt.verify(token, JWT);
        if(!userId){
            return res.status(404).json({
                success: false,
                message: "Invalid id"
            });
        }
        const details = await driverModel.findByIdAndDelete(userId);
        if(details){
            return res.status(404).json({
                success: false,
                message: "Details not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Driver Info Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const updateDriverInfo = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;
    const {
      driverName,
      driverNumber,
      driverAdhaar,
      driverPan,
      drivingLicence,
      driverBankNumber,
      driverIFSC,
      driverBankAddress,
    } = req.body;
    const driverImage = req.files ? req.files.pathname : null;
  
    if (
      !driverImage ||
      !driverName ||
      !driverNumber ||
      !driverAdhaar ||
      !driverPan ||
      !drivingLicence ||
      !driverBankNumber ||
      !driverIFSC ||
      !driverBankAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "All driver fields are required",
      });
    }
    if (!driverNumber.primaryNumber || !driverNumber.secondaryNumber) {
      return res.status(400).json({
        success: false,
        message: "Both primary and secondary phone numbers are required",
      });
    }
    const existingDriver = await driverModel.findOne({
      $or: [
        { "driverNumber.primaryNumber": driverNumber.primaryNumber },
        { driverAdhaar: driverAdhaar },
        { driverPan: driverPan },
        { drivingLicence: drivingLicence },
        { driverBankNumber: driverBankNumber },
      ],
    });
    if (existingDriver) {
      return res.status(409).json({
        success: false,
        message: "Driver with these details already exists",
      });
    }
    if (vehicle) {
      const vehicleExists = await Vehicle.findById(vehicle);
      if (!vehicleExists) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }
    }
    try {
        const { userId } = jwt.verify(token, JWT);
      const updateDriver = await driverModel.findByIdAndUpdate(userId,{
        driverImage,
        driverName,
        driverNumber: [
          {
            primaryNumber: driverNumber.primaryNumber,
            secondaryNumber: driverNumber.secondaryNumber,
          },
        ],
        driverAdhaar,
        driverPan,
        drivingLicence,
        driverBankNumber,
        driverIFSC,
        driverBankAddress,
        // vehicle,
      },{ new: true });
  
      res.status(201).json({
        success: true,
        message: "Driver created successfully",
        driver: updateDriver,
      });
    } catch (error) {
      console.error("Create Driver Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create driver",
        error: error.message,
      });
    }
  };

export { deleteDriverById, deleteDriverInfo, getAllDriverDetails, getDriverById, postDriverInfo, updateDriverInfo, viewDriverInfo };

