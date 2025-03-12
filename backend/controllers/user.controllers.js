import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pkg from 'twilio';
import userModel from '../models/user.model.js';

const { MessagingResponse } = pkg;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOTP(req, res) {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
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

    // Send OTP via SMS using Twilio
    try {
      const twilioClient = new pkg.Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const message = await twilioClient.messages.create({
        body: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      return res.status(200).json({
        success: true,
        message: 'OTP generated and sent successfully',
        userId: user._id,
        ...(process.env.NODE_ENV === 'development' && { otp }),
        smsMessageSid: message.sid
      });
    } catch (twilioError) {
      console.error('Twilio Error:', twilioError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP via SMS',
        error: twilioError.message
      });
    }
  } catch (error) {
    console.error('OTP Request Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate or send OTP',
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
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: "User data",
      user
    });
  } catch (error) {
    console.error('Get User Profile Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

export async function userProfile(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access"
    });
  }
  
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "User profile",
      user: userData
    });
  } catch (error) {
    console.error('User Profile Error:', error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}
