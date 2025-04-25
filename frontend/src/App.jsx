import React, { useState } from "react";
import "./index.css";
import { useAuth } from "./context/AuthContext.jsx";

// CSS for the app
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

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, loading } = useAuth();

  // This is now just a wrapper component
  // All routes are defined in main.jsx
  return (
    <>
      <style>{appStyles}</style>
      
      {/* Search Bar (uncomment if needed) */}
      {/* <div className="search-container">
        <input
          type="text"
          placeholder="Search by college, event, research, or tender..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div> */}
      
      {/* The routes are now in main.jsx */}
    </>
  );
};

export default App;