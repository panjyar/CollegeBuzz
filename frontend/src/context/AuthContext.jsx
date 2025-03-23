import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = (userData) => {
    // Get existing registered users or initialize empty array
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Add new user to the list
    registeredUsers.push(userData);
    
    // Save back to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    // Auto login the user
    login({
      email: userData.email,
      name: userData.name,
      institution: userData.institution,
      role: userData.role
    });
    
    return true;
  };

  // Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};