import React from "react";

const LoginRequired = () => {
  return (
    <div className="login-required-message" style={{ 
      padding: "2rem", 
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto" 
    }}>
      <h2 style={{ marginBottom: "1rem", color: "#1e40af" }}>Please login to access AICTE Central Hub data</h2>
      <p style={{ marginBottom: "2rem", color: "#4b5563" }}>The centralized database for educational institutions across India requires authentication to access.</p>
    </div>
  );
};

export default LoginRequired;