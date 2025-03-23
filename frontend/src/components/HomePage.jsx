import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Calendar, BookOpen, Clock, MapPin, Mail, Phone, Globe, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const categories = ["admissions", "news", "recruitments", "research", "upcoming_events", "notices", "tenders"];

const fieldMappings = {
  admissions: { title: "admission", link: "admission_url" },
  news: { title: "news", link: "news_url" },
  recruitments: { title: "recruitment_title", link: "recruitment_url" },
  research: { title: "research", link: "research_url", author: "research_author" },
  upcoming_events: { title: "upcoming_Event_title", link: "upcoming_Event_url", date: "upcoming_Event_date", year: "upcoming_Event_year", location: "upcoming_Event_location" },
  notices: { title: "notice_title", link: "notice_url" },
  tenders: { title: "tender_title", link: "tender_url" },
};

const collegeMapping = {
  "www.cit.ac.in": "CIT Kokrajhar",
  "www.nita.ac.in": "NIT Agartala",
  "www.iitb.ac.in": "IIT Bombay",
  "www.iitg.ac.in": "IIT Guwahati",
  "www.iitm.ac.in": "IIT Madras",
  "www.iitkgp.ac.in": "IIT Kharagpur",
  "www.nitt.edu": "NIT Trichy",
  "vit.ac.in": "VIT",
  "www.ceed.iitb.ac.in": "IIT Bombay",
  "www.uceed.iitb.ac.in": "IIT Bombay",
  "www.scrs.in": "NIT Agartala",
  "www.erp.iitkgp.ac.in": "IIT Kharagpur"
};

const getCollegeName = (url) => {
  if (!url) return "Unknown";
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    if (collegeMapping[hostname]) return collegeMapping[hostname];

    for (const [urlPart, name] of Object.entries(collegeMapping)) {
      if (hostname.includes(urlPart)) return name;
    }

    return hostname;
  } catch (error) {
    return "Unknown";
  }
};

// Sample upcoming events data as fallback only
const sampleEventsData = [
  {
    upcoming_Event_title: "Annual Technical Symposium",
    upcoming_Event_date: "15 April",
    upcoming_Event_year: "2025",
    upcoming_Event_url: "#",
    upcoming_Event_location: "IIT Bombay"
  },
  {
    upcoming_Event_title: "National Conference on Advanced Computing",
    upcoming_Event_date: "22 May",
    upcoming_Event_year: "2025",
    upcoming_Event_url: "#",
    upcoming_Event_location: "NIT Agartala"
  },
  {
    upcoming_Event_title: "Workshop on Robotics and AI",
    upcoming_Event_date: "10 June",
    upcoming_Event_year: "2025",
    upcoming_Event_url: "#",
    upcoming_Event_location: "IIT Guwahati"
  }
];

const HomePage = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("news");
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredResearch, setFeaturedResearch] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (isAuthenticated) {
      // Fetch main data
      axios
        .get("http://localhost:5000/")
        .then((response) => {
          setData(response.data);
          
          // Set featured events from the actual data
          if (response.data.upcoming_events && response.data.upcoming_events.length > 0) {
            setFeaturedEvents(response.data.upcoming_events.slice(0, 3));
          } else {
            setFeaturedEvents(sampleEventsData);
          }
          
          // Set featured research from the actual data
          if (response.data.research && response.data.research.length > 0) {
            setFeaturedResearch(response.data.research.slice(0, 4));
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isAuthenticated]);

  // Handle tab changes from navbar
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({
      top: document.querySelector('.tabs-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-container">
      <Navbar setActiveTab={handleTabChange} />
      
      {/* Hero Section */}
      <div className="hero-section" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://s6.imgcdn.dev/YjiZa9.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center",
        borderRadius: "0 0 2rem 2rem",
        marginBottom: "2rem"
      }}>
        <h1 className="hero-title" style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Welcome to AICTE Central Hub</h1>
        <p className="hero-subtitle" style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
          Your gateway to news, events, and achievements from AICTE-approved colleges.
        </p>
        {!isAuthenticated && (
          <div className="auth-buttons-container" style={{ marginTop: "2rem" }}>
            <a href="/login" className="action-button login-action" style={{
              backgroundColor: "#1e40af",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              margin: "0 0.5rem",
              fontWeight: "600",
              transition: "background-color 0.3s"
            }}>Login</a>
            <a href="/register" className="action-button register-action" style={{
              backgroundColor: "#ffffff",
              color: "#1e40af",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              margin: "0 0.5rem",
              fontWeight: "600",
              transition: "background-color 0.3s"
            }}>Register</a>
          </div>
        )}
      </div>

      {isAuthenticated ? (
        <div className="main-content" style={{ padding: "0 2rem" }}>
          {/* Featured Sections */}
          <div className="featured-sections" style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginBottom: "2rem"
          }}>
            {/* Upcoming Events Section */}
            <div className="upcoming-events-section">
              <h2 style={{ 
                fontSize: "1.75rem", 
                fontWeight: "600", 
                marginBottom: "1.5rem", 
                color: "#1e40af",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                Upcoming Events
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabChange("upcoming_events");
                  }}
                  style={{
                    fontSize: "1rem",
                    color: "#1e40af",
                    textDecoration: "none"
                  }}
                >
                  View All →
                </a>
              </h2>
              <div className="event-cards" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem"
              }}>
                {featuredEvents.map((event, index) => (
                  <div key={index} className="event-card" style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s",
                    border: "1px solid #e5e7eb"
                  }}>
                    <div className="event-card-header" style={{
                      backgroundColor: "#1e40af",
                      color: "white",
                      padding: "1rem",
                      position: "relative"
                    }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{event[fieldMappings.upcoming_events.title]}</h3>
                    </div>
                    <div className="event-card-body" style={{ padding: "1.25rem" }}>
                      <div className="event-info" style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                        color: "#4b5563"
                      }}>
                        <Calendar size={16} style={{ marginRight: "0.5rem" }} />
                        <span>{event[fieldMappings.upcoming_events.date]}, {event[fieldMappings.upcoming_events.year]}</span>
                      </div>
                      {event[fieldMappings.upcoming_events.location] && (
                        <div className="event-location" style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                          color: "#4b5563"
                        }}>
                          <MapPin size={16} style={{ marginRight: "0.5rem" }} />
                          <span>{event[fieldMappings.upcoming_events.location]}</span>
                        </div>
                      )}
                      <a href={event[fieldMappings.upcoming_events.link]} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-block",
                        marginTop: "0.5rem",
                        color: "#1e40af",
                        fontWeight: "500",
                        textDecoration: "none"
                      }}>Learn more →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Papers Section */}
            {featuredResearch.length > 0 && (
              <div className="research-section" style={{
                backgroundColor: "#f7f9fc",
                padding: "2rem",
                borderRadius: "0.75rem",
                marginTop: "2rem"
              }}>
                <h2 style={{ 
                  fontSize: "1.75rem", 
                  fontWeight: "600", 
                  marginBottom: "1.5rem", 
                  color: "#1e40af",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  Recent Research Papers
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange("research");
                    }}
                    style={{
                      fontSize: "1rem",
                      color: "#1e40af",
                      textDecoration: "none"
                    }}
                  >
                    View All →
                  </a>
                </h2>
                <div className="research-papers-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "1.5rem"
                }}>
                  {featuredResearch.map((paper, index) => {
                    const collegeName = getCollegeName(paper[fieldMappings.research.link]);
                    
                    return (
                      <div key={index} className="research-paper-card" style={{
                        backgroundColor: "white",
                        padding: "1.5rem",
                        borderRadius: "0.75rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e5e7eb"
                      }}>
                        <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "start", gap: "0.75rem" }}>
                          <BookOpen size={20} style={{ color: "#1e40af", flexShrink: 0, marginTop: "0.25rem" }} />
                          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", lineHeight: "1.3", margin: 0 }}>
                            {paper[fieldMappings.research.title]}
                          </h3>
                        </div>
                        <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
                        Published by: {collegeName}
                        </p>
                        <a href={paper[fieldMappings.research.link]} target="_blank" rel="noopener noreferrer" style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#1e40af",
                          fontWeight: "500",
                          textDecoration: "none",
                          fontSize: "0.9rem"
                        }}>
                          Read more →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Original Tab Content */}
          <div className="tabs-container" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem"
          }}>
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-button ${activeTab === category ? "active" : ""}`}
                onClick={() => setActiveTab(category)}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  backgroundColor: activeTab === category ? "#1e40af" : "#f3f4f6",
                  color: activeTab === category ? "white" : "#374151",
                  transition: "all 0.2s"
                }}
              >
                {category.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>

          <div className="content-box" style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            marginBottom: "2rem",
            border: "1px solid #e5e7eb"
          }}>
            {data[activeTab] && data[activeTab].length > 0 ? (
              <ul className="content-list" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {data[activeTab].map((item, index) => {
                  const collegeName = getCollegeName(item[fieldMappings[activeTab]?.link]);

                  return (
                    <li key={index} className="content-item" style={{
                      padding: "1rem",
                      borderBottom: index < data[activeTab].length - 1 ? "1px solid #e5e7eb" : "none",
                      transition: "background-color 0.2s"
                    }}>
                      <a href={item[fieldMappings[activeTab]?.link]} target="_blank" rel="noopener noreferrer" className="content-link" style={{
                        color: "#1e40af",
                        textDecoration: "none",
                        fontWeight: "500",
                        display: "block",
                        marginBottom: "0.5rem"
                      }}>
                        {item[fieldMappings[activeTab]?.title]}
                      </a>
                      {fieldMappings[activeTab]?.date && item[fieldMappings[activeTab]?.date] && (
                        <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#4b5563", marginBottom: "0.35rem" }}>
                          <Clock size={14} style={{ marginRight: "0.35rem" }} />
                          <span>{item[fieldMappings[activeTab]?.date]}</span>
                        </div>
                      )}
                      <p className="college-name" style={{ fontSize: "0.9rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                        {collegeName}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="no-data" style={{ textAlign: "center", color: "#6b7280", padding: "2rem 0" }}>No data available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="login-required-message" style={{ 
          padding: "2rem", 
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto 3rem auto" 
        }}>
          <h2 style={{ marginBottom: "1rem", color: "#1e40af" }}>Please login to access AICTE Central Hub data</h2>
          <p style={{ marginBottom: "2rem", color: "#4b5563" }}>The centralized database for educational institutions across India requires authentication to access.</p>
        </div>
      )}

      {/* Footer Section */}
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Quick Links</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {categories.map((category) => (
                <li key={category} style={{ marginBottom: "0.75rem" }}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange(category);
                    }}
                    style={{ 
                      color: "#e2e8f0", 
                      textDecoration: "none",
                      transition: "color 0.2s"
                    }}
                  >
                    {category.replace("_", " ").charAt(0).toUpperCase() + category.replace("_", " ").slice(1)}
                  </a>
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
            <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.75rem" }}>Subscribe to Newsletter</h4>
            <div style={{ display: "flex" }}>
              <input 
                type="email" 
                placeholder="Your email" 
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem 0 0 0.25rem",
                  border: "none",
                  backgroundColor: "white",
                  flex: "1",
                  fontSize: "0.9rem"
                }}
              />
              <button style={{
                backgroundColor: "#1e40af",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0 0.25rem 0.25rem 0",
                cursor: "pointer",
                fontWeight: "500"
              }}>
                Subscribe
              </button>
            </div>
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
            <a href="#" style={{ color: "#e2e8f0", marginRight: "1.5rem", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#e2e8f0", marginRight: "1.5rem", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "#e2e8f0", textDecoration: "none" }}>Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;