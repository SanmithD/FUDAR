import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminLogin = () => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
        padding: "20px",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 md:left-6 md:top-6 text-white hover:text-gray-400"
      >
        <ArrowLeft size={24} />
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Admin Sign In
        </h2>

        <label style={{ fontSize: "16px", fontWeight: "500" }}>
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter phone number"
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
        <button
          type="button"
          onClick={handleSendOtp}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "gray")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
        >
          Send OTP
        </button>

        <label style={{ fontSize: "16px", fontWeight: "500" }}>OTP</label>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "gray")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
          disabled={!otpSent}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
