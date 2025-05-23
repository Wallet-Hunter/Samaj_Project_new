import React, { useState, useEffect } from "react";
import LoginBg from "../../assets/background3.avif";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft <= 0) {
      setOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  const handleSendOTP = async () => {
  if (!phoneNumber.trim()) return;

  try {
    // Send phone number to the backend for verification
    const response = await fetch(`https://the-samaj-project-login.onrender.com/apidashboard/family_profile/${phoneNumber}/`, {
      method: 'GET',  // Assuming your API is a GET request
    });

    const result = await response.json();  // Parse the JSON response from the server

    if (response.ok && result.status === 'success') {
      // Phone number is linked, OTP can be sent
      setOtpSent(true);
      setTimeLeft(60);
    } else {
      // Phone number not linked
      alert(result.message || 'Phone number not found. Redirecting to signup...');
      navigate('/signup', { state: { phoneNumber } });  // Pass phone number to the signup page
    }
  } catch (error) {
    console.error('Error checking user:', error);
    alert('Server error. Please try again later.');
  }
};


  const handleLogin = () => {
    if (otp === "123456") {
      const userType = "head"; // Replace with actual check
      navigate(`/head-dashboard`, { state: { phoneNumber } }); // Pass phoneNumber via state
    } else if (otp === "1234") {
      const userType = "member"; // Replace with actual check
      navigate(`/member-profile`, { state: { phoneNumber } }); // Pass phoneNumber via state
    } else {
      alert("Invalid OTP");
    }
  };

  const styles = {
    body: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundImage: `url(${LoginBg})`,

      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      margin: 0,
    },
    container: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
      width: "90%",
      maxWidth: "400px",
      padding: "40px",
      animation: "fadeIn 0.8s ease-in-out",
    },
    heading: {
      marginBottom: "30px",
      color: "#fff",
      fontSize: "26px",
      fontWeight: "600",
      textAlign: "center",
    },
    label: {
      display: "block",
      margin: "12px 0 6px",
      color: "#fff",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      marginBottom: "16px",
      border: "1px solid #ccc",
      borderRadius: "12px",
      fontSize: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      transition: "all 0.3s ease-in-out",
    },
    button: {
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
      border: "none",
      padding: "14px",
      width: "100%",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.4s ease, transform 0.2s ease",
      marginTop: "10px",
    },
    timer: {
      fontSize: "14px",
      color: "#ddd",
      marginTop: "-8px",
      marginBottom: "16px",
      fontStyle: "italic",
      textAlign: "right",
    },
    fadeInKeyframes: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  };

  return (
    <div style={styles.body}>
      {/* Inject keyframes using style tag */}
      <style>{styles.fadeInKeyframes}</style>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login to Continue</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="phone_number" style={styles.label}>
            Mobile Number
          </label>
          <input
            type="text"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. +91XXXXXXXXXX"
            required
            style={styles.input}
          />
          {!otpSent && (
            <button type="button" style={styles.button} onClick={handleSendOTP}>
              Send OTP
            </button>
          )}
          {otpSent && (
            <div>
              <label htmlFor="otp" style={styles.label}>
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                maxLength={6}
                style={styles.input}
              />
              <div style={styles.timer}>
                {timeLeft > 0
                  ? `00:${timeLeft.toString().padStart(2, "0")}`
                  : "⏳ OTP expired. Please resend."}
              </div>
              <button type="button" style={styles.button} onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
          <p style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "#00c6ff", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
