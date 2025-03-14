import "dotenv/config";
import jwt from "jsonwebtoken";
import { bookModel } from "../models/book.model.js";
import { driverModel, vehicleModel } from "../models/driver.model.js";


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

const getAllDriverDetails = async (req, res) => {
  try {
    const details = await driverModel.find();
    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Details not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Drivers Details",
      details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const details = await driverModel.findById(id);
    const salaryDetails = await bookModel.findOne({ driver: id});

    let salary = [];
    if(salaryDetails){
        salary = salaryDetails.monthlySalaries || [];
    }
    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Driver Details",
      details,
      salary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const viewDriverInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.SECRET;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const { userId } = jwt.verify(token, JWT);
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Invalid id",
      });
    }
    const details = await driverModel.findById(userId);
    if (details) {
      return res.status(404).json({
        success: false,
        message: "Details not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Driver Info",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteDriverById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const details = await driverModel.findByIdAndDelete(id);
    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Driver Details Deleted",
      details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const deleteDriverInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.SECRET;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const { userId } = jwt.verify(token, JWT);
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Invalid id",
      });
    }
    const details = await driverModel.findByIdAndDelete(userId);
    if (details) {
      return res.status(404).json({
        success: false,
        message: "Details not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Driver Info Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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
    const updateDriver = await driverModel.findByIdAndUpdate(
      userId,
      {
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
      },
      { new: true }
    );

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

const createVehicle = async (req, res) => {
  const {
    vehicleType,
    vehicleNumber
  } = req.body;

  const vehicleImage = req.files?.vehicleImage?.[0]?.path;
  const emissionTest = req.files?.emissionTest?.[0]?.path;
  const vehicleRC = req.files?.vehicleRC?.[0]?.path;
  const vehicleInsurance = req.files?.vehicleInsurance?.[0]?.path;
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.SECRET;

  if (
    !vehicleType ||
    !vehicleNumber ||
    !emissionTest ||
    !vehicleRC ||
    !vehicleInsurance ||
    !vehicleImage
  ) {
    return res.status(400).json({
      success: false,
      message: "All vehicle fields are required",
    });
  }

  try {
    const existingVehicle = await vehicleModel.findOne({
      $or: [{ vehicleNumber: vehicleNumber }, { vehicleRC: vehicleRC }],
    });

    if (existingVehicle) {
      return res.status(409).json({
        success: false,
        message: "Vehicle with this number or RC already exists",
      });
    }

    const newVehicle = new vehicleModel({
      vehicleType,
      vehicleNumber,
      emissionTest,
      vehicleRC,
      vehicleInsurance,
      vehicleImage,
    });

    const { userId } = jwt.verify(token, JWT);
    if (userId) {
      const driver = await driverModel.findById(userId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      newVehicle.userId = driver.userId;
      await newVehicle.save();

      driver.vehicle = newVehicle._id;
      await driver.save();

      return res.status(201).json({
        success: true,
        message: "Vehicle created and assigned to driver successfully",
        vehicle: newVehicle,
      });
    }

    // If no driver ID, just save the vehicle
    await newVehicle.save();
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("Create Vehicle Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
      error: error.message,
    });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find();
    res.status(200).json({
      success: true,
      message: "All vehicles retrieved successfully",
      vehicles,
    });
  } catch (error) {
    console.error("Get All Vehicles Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicles",
      error: error.message,
    });
  }
};

const getVehicleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }

  try {
    const vehicle = await vehicleModel.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Get Vehicle By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle",
      error: error.message,
    });
  }
};

const updateVehicleById = async (req, res) => {
  const { id } = req.params;
  const {
    vehicleType,
    vehicleNumber,
    driverId,
  } = req.body;

  const vehicleImage = req.files?.vehicleImage?.[0]?.path;
  const emissionTest = req.files?.emissionTest?.[0]?.path;
  const vehicleRC = req.files?.vehicleRC?.[0]?.path;
  const vehicleInsurance = req.files?.vehicleInsurance?.[0]?.path;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }

  try {
    const vehicle = await vehicleModel.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (
      vehicleNumber !== vehicle.vehicleNumber ||
      vehicleRC !== vehicle.vehicleRC
    ) {
      const existingVehicle = await vehicleModel.findOne({
        _id: { $ne: id },
        $or: [{ vehicleNumber: vehicleNumber }, { vehicleRC: vehicleRC }],
      });

      if (existingVehicle) {
        return res.status(409).json({
          success: false,
          message: "Vehicle with this number or RC already exists",
        });
      }
    }

    const updateData = {
      vehicleType: vehicleType || vehicle.vehicleType,
      vehicleNumber: vehicleNumber || vehicle.vehicleNumber,
      emissionTest: emissionTest || vehicle.emissionTest,
      vehicleRC: vehicleRC || vehicle.vehicleRC,
      vehicleInsurance: vehicleInsurance || vehicle.vehicleInsurance,
    };

    if (vehicleImage) {
      updateData.vehicleImage = vehicleImage;
    }

    const updatedVehicle = await vehicleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (driverId) {
      if (vehicle.userId) {
        const previousDriver = await driverModel.findOne({
          vehicle: vehicle._id,
        });
        if (previousDriver) {
          previousDriver.vehicle = null;
          await previousDriver.save();
        }
      }

      const driver = await driverModel.findById(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      updatedVehicle.userId = driver.userId;
      await updatedVehicle.save();

      driver.vehicle = updatedVehicle._id;
      await driver.save();
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Update Vehicle Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message,
    });
  }
};

const deleteVehicleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }

  try {
    const vehicle = await vehicleModel.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.userId) {
      const driver = await driverModel.findOne({ vehicle: vehicle._id });
      if (driver) {
        driver.vehicle = null;
        await driver.save();
      }
    }

    await vehicleModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Delete Vehicle Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
      error: error.message,
    });
  }
};

const assignVehicleToDriver = async (req, res) => {
  const { vehicleId, driverId } = req.body;

  if (!vehicleId || !driverId) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID and Driver ID are required",
    });
  }

  try {
    const vehicle = await vehicleModel.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const driver = await driverModel.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (vehicle.userId) {
      const previousDriver = await driverModel.findOne({
        vehicle: vehicle._id,
      });
      if (previousDriver && previousDriver._id.toString() !== driverId) {
        previousDriver.vehicle = null;
        await previousDriver.save();
      }
    }

    if (driver.vehicle) {
      const previousVehicle = await vehicleModel.findById(driver.vehicle);
      if (previousVehicle) {
        previousVehicle.userId = null;
        await previousVehicle.save();
      }
    }

    vehicle.userId = driver.userId;
    await vehicle.save();

    driver.vehicle = vehicle._id;
    await driver.save();

    res.status(200).json({
      success: true,
      message: "Vehicle assigned to driver successfully",
      vehicle,
      driver,
    });
  } catch (error) {
    console.error("Assign Vehicle Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign vehicle",
      error: error.message,
    });
  }
};

const unassignVehicleFromDriver = async (req, res) => {
  const { vehicleId } = req.body;

  if (!vehicleId) {
    return res.status(400).json({
      success: false,
      message: "Vehicle ID is required",
    });
  }

  try {
    const vehicle = await vehicleModel.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.userId) {
      const driver = await driverModel.findOne({ vehicle: vehicle._id });
      if (driver) {
        driver.vehicle = null;
        await driver.save();
      }

      vehicle.userId = null;
      await vehicle.save();
    }

    res.status(200).json({
      success: true,
      message: "Vehicle unassigned from driver successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Unassign Vehicle Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unassign vehicle",
      error: error.message,
    });
  }
};

const getVehicleByDriverId = async (req, res) => {
  const { driverId } = req.params;

  if (!driverId) {
    return res.status(400).json({
      success: false,
      message: "Driver ID is required",
    });
  }

  try {
    const driver = await driverModel.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (!driver.vehicle) {
      return res.status(404).json({
        success: false,
        message: "No vehicle assigned to this driver",
      });
    }

    const vehicle = await vehicleModel.findById(driver.vehicle);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Get Vehicle By Driver ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle",
      error: error.message,
    });
  }
};


export {
  assignVehicleToDriver, createVehicle, deleteDriverById, deleteDriverInfo, deleteVehicleById, getAllDriverDetails, getAllVehicles, getDriverById, getVehicleByDriverId, getVehicleById, postDriverInfo, unassignVehicleFromDriver, updateDriverInfo, updateVehicleById, viewDriverInfo
};

