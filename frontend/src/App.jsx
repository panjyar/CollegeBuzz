import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// CSS for the login-required message
const appStyles = `
.login-required-message {
  text-align: center;
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.login-required-message h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.login-required-message p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.auth-buttons-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.login-action {
  background-color: #3498db;
  color: white;
}

.login-action:hover {
  background-color: #2980b9;
}

.register-action {
  background-color: #f1f1f1;
  color: #2c3e50;
  border: 1px solid #ddd;
}

.register-action:hover {
  background-color: #e9e9e9;
}

.search-container {
  text-align: center;
  margin: 20px 0;
}

.search-input {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: #007bff;
}
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <style>{appStyles}</style>
      <Router>
        {/* 🔍 Search Bar */}
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search by college, event, research, or tender..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div> */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
