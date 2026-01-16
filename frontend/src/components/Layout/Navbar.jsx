import React, { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const categories = [
  { name: "News", path: "/home/news" },
  { name: "Events", path: "/home/upcoming_events" },
  { name: "Tenders", path: "/home/tenders" },
  { name: "Research", path: "/home/research" },
  { name: "Admissions", path: "/home/admissions" },
  { name: "Recruitments", path: "/home/recruitments" },
];

const Navbar = ({ setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, tab) => {
    if (setActiveTab && tab) {
      setActiveTab(tab);
    }
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <nav style={{
      backgroundColor: "#2B2B2B",
      color: "#FFFFFF",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px"
        }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#FFFFFF"
            }}
          >
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
            <span style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              letterSpacing: "-0.025em"
            }}>
              CollegeBuzz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem"
          }} className="desktop-nav">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem"
            }}>
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleNavigation(cat.path, cat.path.split("/").pop())}
                  style={{
                    background: "none",
                    border: "none",
                    color: isActive(cat.path) ? "#FFFFFF" : "#B3B3B3",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                >
                  {cat.name}
                </button>
              ))}

              {/* More dropdown - simplified for now */}
              <div style={{ position: "relative" }}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#B3B3B3",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  More <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Search & About */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#B3B3B3",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Search size={20} />
              </button>

              <Link
                to="/about"
                style={{
                  color: "#B3B3B3",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  transition: "color 0.15s ease"
                }}
              >
                About
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#FFFFFF",
              padding: "0.5rem",
              cursor: "pointer"
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div style={{
            paddingBottom: "1rem"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "0.5rem 1rem"
            }}>
              <Search size={18} style={{ color: "#B3B3B3" }} />
              <input
                type="text"
                placeholder="Search announcements, colleges, events..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "0.875rem",
                  outline: "none"
                }}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#B3B3B3",
                  cursor: "pointer",
                  padding: "0.25rem"
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem 1.5rem"
        }}>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleNavigation(cat.path, cat.path.split("/").pop())}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                color: "#FFFFFF",
                fontSize: "1rem",
                padding: "0.75rem 0",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              {cat.name}
            </button>
          ))}
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: "block",
              color: "#FFFFFF",
              fontSize: "1rem",
              padding: "0.75rem 0",
              textDecoration: "none"
            }}
          >
            About
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;