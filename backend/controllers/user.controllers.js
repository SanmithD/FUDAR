import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { bookModel } from "../models/book.model.js";
import { driverModel } from "../models/driver.model.js";
import userModel from "../models/user.model.js";

const userSignup = async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  if (!name || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the details",
    });
  }
  const user = await userModel.findOne({ phoneNumber });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already exists please login",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      role: "driver",
      phoneNumber,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Signup success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the details",
    });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the details",
    });
  }
  const user = await userModel.findOne({ phoneNumber });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exists please signup",
    });
  }
  try {
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(400).json({
        success: false,
        message: "Incorrect details",
      });
    }
    const loggedUser = await userModel.findOne({ phoneNumber });
    const token = jwt.sign(
      { id: loggedUser.id, phoneNumber: loggedUser.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      success: true,
      message: "Login success",
      loggedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const userProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.JWT_SECRET;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Profile",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await userModel.find();
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Users",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const getUserSalary = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.JWT_SECRET;

  try {
    const { id } = jwt.verify(token, JWT);
    const salary = await driverModel.findOne({ userId: id });
    const { _id } = salary;
    const response = await bookModel.findOne({ driver: _id });
    res.status(200).json({
      success: true,
      message: "Driver salary",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staff = await userModel.find({ role: "staff" });

    if (staff.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No staff members found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff members retrieved successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while fetching staff",
    });
  }
};

const deleteStaff = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const response = await userModel.findByIdAndDelete(id);
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

export {
  deleteStaff,
  getAllStaff,
  getAllUsers,
  getUserSalary,
  updateUser,
  userLogin,
  userProfile,
  userSignup
};

