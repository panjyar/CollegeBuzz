import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { FaGraduationCap } from "react-icons/fa";
import { useAuth } from "./context.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Here you would typically make an API call to your backend
    // For demonstration, we'll use a mock login
    // You can extend this logic to validate against registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Check if this is a demo login
    if (email === "admin@example.com" && password === "password") {
      // Store the user information in localStorage
      const userData = { 
        email,
        name: "Admin User",
        role: "admin"
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Call the login method from auth context
      login(userData);
      
      // Redirect to home
      navigate("/");
      return;
    }
    
    // Try to find user in registered users
    const user = registeredUsers.find(u => u.email === email);
    if (user && user.password === password) {
      // Store the user information but without the password
      const userData = { 
        email: user.email,
        name: user.name,
        institution: user.institution,
        role: user.role
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Call the login method from auth context
      login(userData);
      
      // Redirect to home
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <FaGraduationCap className="login-logo" />
          <h2>AICTE Central Hub</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-submit-btn">
            Login
          </button>
          
          <div className="login-footer">
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;