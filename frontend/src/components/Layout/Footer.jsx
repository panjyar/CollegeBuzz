import React from "react";
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { categories } from "../../utils/fieldMappings.js";
import { Link } from "react-router-dom";
import NewsletterSubscribe from "../common/NewsletterSubscribe.jsx";

const Footer = ({ handleTabChange }) => {
  return (
    <footer style={{
      backgroundColor: "#1e3a8a",
      color: "white",
      padding: "3rem 2rem",
      marginTop: "3rem"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* About Column */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>About AICTE Central Hub</h3>
          <p style={{ lineHeight: "1.6", fontSize: "0.95rem", color: "#e2e8f0" }}>
            AICTE Central Hub is a comprehensive platform that aggregates information from AICTE-approved institutions across India, providing a single point of access for students, educators, and stakeholders.
          </p>
          <Link 
            to="/about" 
            style={{ 
              display: "inline-block", 
              marginTop: "0.75rem", 
              color: "#e2e8f0", 
              textDecoration: "underline", 
              fontSize: "0.95rem" 
            }}
          >
            Learn more about us
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Quick Links</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {categories.map((category) => (
              <li key={category} style={{ marginBottom: "0.75rem" }}>
                <Link
                  to={`/home/${category}`}
                  style={{ 
                    color: "#e2e8f0", 
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                >
                  {category.replace("_", " ").charAt(0).toUpperCase() + category.replace("_", " ").slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Contact Us</h3>
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
            <MapPin size={16} style={{ marginRight: "0.75rem", flexShrink: 0 }} />
            <span style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>
              AICTE Headquarters, Nelson Mandela Marg, New Delhi, 110070
            </span>
          </div>
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
            <Phone size={16} style={{ marginRight: "0.75rem", flexShrink: 0 }} />
            <span style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>
              +91-11-2658-1000
            </span>
          </div>
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
            <Mail size={16} style={{ marginRight: "0.75rem", flexShrink: 0 }} />
            <span style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>
              support@aictehub.ac.in
            </span>
          </div>
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center" }}>
            <Globe size={16} style={{ marginRight: "0.75rem", flexShrink: 0 }} />
            <span style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>
              www.aicte-india.org
            </span>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Connect With Us</h3>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <a href="#" style={{ color: "white", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.1)" }}>
              <Facebook size={18} />
            </a>
            <a href="#" style={{ color: "white", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.1)" }}>
              <Twitter size={18} />
            </a>
            <a href="#" style={{ color: "white", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.1)" }}>
              <Linkedin size={18} />
            </a>
            <a href="#" style={{ color: "white", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.1)" }}>
              <Instagram size={18} />
            </a>
          </div>
          <NewsletterSubscribe />
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.2)",
        marginTop: "2rem",
        paddingTop: "1.5rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#e2e8f0"
      }}>
        <p>&copy; {new Date().getFullYear()} AICTE Central Hub. All rights reserved.</p>
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/privacy-policy" style={{ color: "#e2e8f0", marginRight: "1.5rem", textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: "#e2e8f0", marginRight: "1.5rem", textDecoration: "none" }}>Terms of Service</Link>
          <Link to="/sitemap" style={{ color: "#e2e8f0", textDecoration: "none" }}>Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;