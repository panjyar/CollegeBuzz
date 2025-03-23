import React from "react";

const HeroSection = ({ isAuthenticated }) => {
  return (
    <div className="hero-section" style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://s6.imgcdn.dev/YjiZa9.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      padding: "4rem 2rem",
      textAlign: "center",
      borderRadius: "0 0 2rem 2rem",
      marginBottom: "2rem"
    }}>
      <h1 className="hero-title" style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Welcome to AICTE Central Hub</h1>
      <p className="hero-subtitle" style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
        Your gateway to news, events, and achievements from AICTE-approved colleges.
      </p>
      {!isAuthenticated && (
        <div className="auth-buttons-container" style={{ marginTop: "2rem" }}>
          <a href="/login" className="action-button login-action" style={{
            backgroundColor: "#1e40af",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            margin: "0 0.5rem",
            fontWeight: "600",
            transition: "background-color 0.3s"
          }}>Login</a>
          <a href="/register" className="action-button register-action" style={{
            backgroundColor: "#ffffff",
            color: "#1e40af",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            margin: "0 0.5rem",
            fontWeight: "600",
            transition: "background-color 0.3s"
          }}>Register</a>
        </div>
      )}
    </div>
  );
};

export default HeroSection;