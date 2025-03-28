// models/BookModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  staffVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffVehicle',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  vehicleImages: {
    front: { type: String, required: true },
    back: { type: String, required: true },
    side: { type: String, required: true }
  },
  monthlySalaries: [{
    month: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  }
}, { timestamps: true });

export const bookModel = mongoose.model('Booking', bookingSchema);