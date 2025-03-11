import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOTP(req, res) {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and user name are required' 
      });
    }
    
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); 
    
    let user = await userModel.findOne({ phoneNumber });
    
    if (!user) {
      user = new userModel({
        phoneNumber,
        otp: {
          code: otp,
          expiresAt: otpExpiry
        }
      });
    } else {
      user.otp = {
        code: otp,
        expiresAt: otpExpiry
      };
    }
    
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'OTP generated successfully',
      userId: user._id,
      ...(process.env.NODE_ENV === 'development' && { otp }),
    });
  } catch (error) {
    console.error('OTP Request Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate OTP',
      error: error.message
    });
  }
}

export async function verifyOTP(req, res) {
  try {
    const { phoneNumber, code } = req.body;
    
    if (!phoneNumber || !code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and verification code are required' 
      });
    }
    
    const user = await userModel.findOne({ phoneNumber });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const now = new Date();
    
    if (!user.otp || !user.otp.code || !user.otp.expiresAt || now > user.otp.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired'
      });
    }
    
    if (user.otp.code !== code) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }
    
    user.verified = true;
    user.otp = null;
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Verification successful',
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        verified: user.verified,
        lastLogin: user.lastLogin
      },
      token
    });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify code',
      error: error.message
    });
  }
}

export async function getUserProfile(req, res) {
    const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
    //   id: user._id,
    //   phoneNumber: user.phoneNumber,
    //   verified: user.verified,
    //   createdAt: user.createdAt,
    //   lastLogin: user.lastLogin
    success: true,
    message: "User data",
    user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const userProfile = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.JWT_SECRET;

    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        });
    };
    try {
        const { userId } = jwt.verify(token, JWT);
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({
                success: false,
                message: "Cannot found the user"
            });
        };
        res.status(200).json({
            success: true,
            message: "User profile",
            userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export default userProfile