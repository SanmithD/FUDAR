import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  emissionTest:{
    type: String,
    required: true
  },
  vehicleRC:{
    type: String,
    required: true,
    unique: true
  },
  vehicleInsurance:{
    type: String,
    required: true
  },
  vehicleImage:{
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, { timestamps: true });

export const vehicleModel = mongoose.model('Vehicle', vehicleSchema);

const driverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  driverImage: {
    type: String,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  driverNumber: [{
    primaryNumber: {
      type: String,
      required: true,
      unique: true
    },
    secondaryNumber: {
      type: String,
      required: true
    }
  }],
  driverAdhaar: {
    type: String,
    required: true,
    unique: true
  },
  driverPan: {
    type: String,
    required: true,
    unique: true
  },
  drivingLicence: {
    type: String,
    required: true,
    unique: true
  },
  driverBankNumber: {
    type: String,
    required: true,
    unique: true
  },
  driverIFSC: {
    type: String,
    required: true
  },
  driverBankAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available"
  },
  // Reference to Vehicle model (optional)
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: false
  }
}, { timestamps: true });

export const driverModel = mongoose.model('Driver', driverSchema);