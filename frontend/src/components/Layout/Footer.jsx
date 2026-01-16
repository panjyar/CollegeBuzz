import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "News", path: "/home/news" },
  { name: "Notices", path: "/home/notices" },
  { name: "Tenders", path: "/home/tenders" },
  { name: "Events", path: "/home/upcoming_events" },
  { name: "Recruitments", path: "/home/recruitments" },
  { name: "Admissions", path: "/home/admissions" },
  { name: "Research", path: "/home/research" },
];

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#2B2B2B",
      color: "#FFFFFF",
      marginTop: "auto"
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1.5rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem"
        }}>
          {/* Brand Column */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "1.25rem",
                color: "#2B2B2B"
              }}>
                C
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: "700" }}>CollegeBuzz</span>
            </div>
            <p style={{
              fontSize: "0.875rem",
              color: "#B3B3B3",
              lineHeight: "1.6",
              maxWidth: "280px"
            }}>
              Aggregating news, events, and updates from AICTE-approved colleges across India.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Categories
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.name} style={{ marginBottom: "0.5rem" }}>
                  <Link
                    to={cat.path}
                    style={{
                      color: "#B3B3B3",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "color 0.15s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#FFFFFF"}
                    onMouseLeave={(e) => e.target.style.color = "#B3B3B3"}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/about" style={{ color: "#B3B3B3", fontSize: "0.875rem", textDecoration: "none" }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/archive" style={{ color: "#B3B3B3", fontSize: "0.875rem", textDecoration: "none" }}>
                  Archive
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/privacy-policy" style={{ color: "#B3B3B3", fontSize: "0.875rem", textDecoration: "none" }}>
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/terms" style={{ color: "#B3B3B3", fontSize: "0.875rem", textDecoration: "none" }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Disclaimer
            </h4>
            <p style={{
              fontSize: "0.8rem",
              color: "#B3B3B3",
              lineHeight: "1.6"
            }}>
              CollegeBuzz is not affiliated with AICTE or any government body.
              This is an independent platform for educational information.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "1.5rem",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "0.8rem",
          color: "#B3B3B3",
          margin: 0
        }}>
          © {new Date().getFullYear()} CollegeBuzz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;