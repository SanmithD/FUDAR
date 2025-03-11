import mongoose from "mongoose";

const staffVehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true
  },
  vehicleImage: [{
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    },
    side: {
      type: String,
      required: true
    }
  }],
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  staffVehicleRC: {
    type: String,
    required: true
  },
  staffVehicleEmission: {
    type: String,
    required: true
  },
  staffVehicleInsurance: {
    type: String,
    required: true
  },
}, { timestamps: true });

const staffVehicleModel = mongoose.model('StaffVehicle', staffVehicleSchema);

export default staffVehicleModel;