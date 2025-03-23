import React from "react";
import { FaGraduationCap, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../components/context.jsx";
import "./Navbar.css";

const Navbar = ({ setActiveTab }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally redirect to home page
    // navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaGraduationCap className="logo" />
        <a href="/" style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "1rem" ,textDecoration: "None" , color: "whitesmoke"}} ><span className="brand-text">AICTE Central Hub</span></a>
      </div>
      <ul className="nav-links">
        <li><button onClick={() => setActiveTab("admissions")}>Admission</button></li>
        <li><button onClick={() => setActiveTab("news")}>News</button></li>
        <li><button onClick={() => setActiveTab("upcoming_events")}>Events</button></li>
        <li><button onClick={() => setActiveTab("research")}>Research</button></li>
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