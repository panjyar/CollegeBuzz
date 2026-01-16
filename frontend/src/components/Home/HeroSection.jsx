import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section style={{
      backgroundColor: "#FFFFFF",
      padding: "5rem 1.5rem",
      borderBottom: "1px solid #D4D4D4"
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#F8F8F8",
          borderRadius: "9999px",
          fontSize: "0.875rem",
          color: "#666666",
          marginBottom: "1.5rem",
          border: "1px solid #D4D4D4"
        }}>
          <span style={{ fontSize: "1rem" }}>🎓</span>
          AICTE College Updates Platform
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#2B2B2B",
          lineHeight: "1.1",
          marginBottom: "1.5rem",
          letterSpacing: "-0.025em"
        }}>
          All College Updates.
          <br />
          <span style={{ color: "#B3B3B3" }}>One Platform.</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: "1.25rem",
          color: "#666666",
          lineHeight: "1.6",
          maxWidth: "600px",
          margin: "0 auto 2rem"
        }}>
          News, events, tenders, and research updates from 500+ AICTE-approved
          colleges across India — aggregated and organized for you.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center"
        }}>
          <Link
            to="/home/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              backgroundColor: "#2B2B2B",
              color: "#FFFFFF",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              textDecoration: "none",
              transition: "background-color 0.15s ease"
            }}
          >
            Browse Announcements
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              backgroundColor: "#FFFFFF",
              color: "#2B2B2B",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              textDecoration: "none",
              border: "1px solid #D4D4D4",
              transition: "background-color 0.15s ease"
            }}
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid #D4D4D4",
          flexWrap: "wrap"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2B2B2B"
            }}>500+</div>
            <div style={{
              fontSize: "0.875rem",
              color: "#B3B3B3"
            }}>Colleges Indexed</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2B2B2B"
            }}>10K+</div>
            <div style={{
              fontSize: "0.875rem",
              color: "#B3B3B3"
            }}>Active Announcements</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2B2B2B"
            }}>Daily</div>
            <div style={{
              fontSize: "0.875rem",
              color: "#B3B3B3"
            }}>Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;