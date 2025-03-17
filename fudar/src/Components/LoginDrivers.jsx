import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginDrivers = () => {
  const navigate = useNavigate();

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
        className="absolute left-4 top-4 md:left-6 md:top-6 text-white hover:text-gray-300"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <ArrowLeft size={24} />
      </button>
      
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          width: "450px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "black",
            marginBottom: "20px",
          }}
        >
          Driver Login
        </h2>
        <p style={{ fontSize: "18px", color: "black", marginBottom: "30px" }}>
          Access your account to continue
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <button
            onClick={() => navigate("/DriverSignIn")}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "12px",
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
            Sign In
          </button>

          <p style={{ fontSize: "16px", fontWeight: "500", color: "gray" }}>
            New User?
          </p>

          <button
            onClick={() => navigate("/Register")}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "12px",
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
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDrivers;
