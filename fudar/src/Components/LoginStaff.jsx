import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import back arrow icon

const LoginStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phoneNumber: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendOtp = () => {
    if (formData.phoneNumber) {
      setOtpSent(true);
      alert("OTP Sent Successfully!");
    } else {
      alert("Please enter a phone number first.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-In Data:", formData);
    alert("Sign-In Successful!");
    navigate("/dashboard"); // Redirect to dashboard after successful login
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black px-4">
      {/* Back Arrow Outside Container */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 md:top-6 md:left-6 text-white hover:text-gray-300"
      >
        <ArrowLeft size={28} />
      </button>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Staff Sign In
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Phone Number Input */}
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring focus:ring-gray-400"
          />

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-black text-white py-2 rounded-md font-semibold transition hover:bg-gray-700"
          >
            Send OTP
          </button>

          {/* OTP Input */}
          <label className="text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:ring focus:ring-gray-400"
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold transition hover:bg-gray-700"
            disabled={!otpSent}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginStaff;
