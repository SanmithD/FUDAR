import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
