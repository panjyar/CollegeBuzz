import React from "react";
import { FaGraduationCap, FaSignOutAlt, FaUser, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { scrollToTabContent } from "../../utils/navigationUtils.js";
import "../Layout/Navbar.css";

const Navbar = ({ setActiveTab }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // If already on home page, scroll directly
    if (location.pathname === "/" || location.pathname.startsWith("/home")) {
      scrollToTabContent();
    } else {
      // Navigate to home page first, then scroll after navigation completes
      navigate("/home/" + tab);
      setTimeout(scrollToTabContent, 300);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaGraduationCap className="logo" />
        <Link to="/" style={{ fontSize: "1.25rem", fontWeight: "800", textDecoration: "None", color: "whitesmoke" }}>
          <span className="brand-text">AICTE Central Hub</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/about" style={{ textDecoration: "none", display: "flex", alignItems: "center" , color:"white" }}>About Us</Link></li>
        <li><button onClick={() => handleTabChange("admissions")}>Admission</button></li>
        <li><button onClick={() => handleTabChange("news")}>News</button></li>
        <li><button onClick={() => handleTabChange("upcoming_events")}>Events</button></li>
        <li><button onClick={() => handleTabChange("research")}>Research</button></li>
      </ul>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <div className="user-menu">
            <span className="user-email"><FaUser /> {user?.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;