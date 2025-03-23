import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children, handleTabChange }) => {
  return (
    <div className="app-container">
      <Navbar setActiveTab={handleTabChange} />
      <main>{children}</main>
      <Footer handleTabChange={handleTabChange} />
    </div>
  );
};

export default Layout;
