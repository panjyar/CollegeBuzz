import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { FaGraduationCap, FaUniversity, FaUsers, FaChartLine, FaLightbulb, FaHandshake } from "react-icons/fa";
import ClientLogos from "../components/About/ClientLogos.jsx";
import heroimg from "../assets/img1.jpg";
const AboutPage = () => {
  return (
    <Layout>
      <div className="about-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Hero Section */}
        <section 
          style={{ 
            textAlign: "center", 
            marginBottom: "4rem",
            background: `url(${heroimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "5rem 2rem",
            borderRadius: "8px"
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontWeight: "700" }}>About AICTE Central Hub</h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
            Connecting educational institutions across India to build a stronger, more unified educational ecosystem.
          </p>
        </section>

        {/* Our Mission */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center", color: "#1e3a8a" }}>Our Mission</h2>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 400px" }}>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#4b5563" }}>
                The AICTE Central Hub was established with a clear vision: to create a unified platform that seamlessly connects all AICTE-approved institutions across India. Our mission is to bridge information gaps, foster collaboration between educational institutions, and provide students, educators, and stakeholders with immediate access to essential educational resources and updates.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#4b5563", marginTop: "1rem" }}>
                We strive to enhance the quality of technical education by facilitating easy access to important announcements, opportunities, and resources from various institutions. By aggregating this information in one central location, we empower students to make informed decisions about their educational journey and help institutions stay connected to the broader educational ecosystem.
              </p>
            </div>
            <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ 
                width: "300px", 
                height: "300px", 
                backgroundColor: "#1e3a8a", 
                borderRadius: "50%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                color: "white"
              }}>
                <FaGraduationCap size={120} />
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section style={{ marginBottom: "4rem", backgroundColor: "#f3f4f6", padding: "3rem 2rem", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center", color: "#1e3a8a" }}>Key Features</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem" 
          }}>
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <FaUniversity size={50} style={{ color: "#1e3a8a", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937" }}>Comprehensive Database</h3>
              <p style={{ color: "#4b5563" }}>Access information from thousands of AICTE-approved institutions through a single platform.</p>
            </div>
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <FaUsers size={50} style={{ color: "#1e3a8a", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937" }}>Community Building</h3>
              <p style={{ color: "#4b5563" }}>Connect students, educators, and institutions to foster collaboration and knowledge sharing.</p>
            </div>
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <FaChartLine size={50} style={{ color: "#1e3a8a", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937" }}>Real-time Updates</h3>
              <p style={{ color: "#4b5563" }}>Stay informed with the latest announcements, events, and opportunities from institutions nationwide.</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center", color: "#1e3a8a" }}>Our Values</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "2rem" 
          }}>
            <div style={{ 
              padding: "2rem", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              borderRadius: "8px", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center" 
            }}>
              <div style={{ 
                backgroundColor: "#e0e7ff", 
                borderRadius: "50%", 
                width: "80px", 
                height: "80px", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                marginBottom: "1.5rem" 
              }}>
                <FaLightbulb size={40} style={{ color: "#1e3a8a" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937", textAlign: "center" }}>Innovation</h3>
              <p style={{ color: "#4b5563", textAlign: "center" }}>We constantly seek new ways to improve access to educational information and resources.</p>
            </div>
            <div style={{ 
              padding: "2rem", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              borderRadius: "8px", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center" 
            }}>
              <div style={{ 
                backgroundColor: "#e0e7ff", 
                borderRadius: "50%", 
                width: "80px", 
                height: "80px", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                marginBottom: "1.5rem" 
              }}>
                <FaHandshake size={40} style={{ color: "#1e3a8a" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937", textAlign: "center" }}>Collaboration</h3>
              <p style={{ color: "#4b5563", textAlign: "center" }}>We believe in the power of working together to achieve greater educational outcomes.</p>
            </div>
            <div style={{ 
              padding: "2rem", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              borderRadius: "8px", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center" 
            }}>
              <div style={{ 
                backgroundColor: "#e0e7ff", 
                borderRadius: "50%", 
                width: "80px", 
                height: "80px", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                marginBottom: "1.5rem" 
              }}>
                <FaUsers size={40} style={{ color: "#1e3a8a" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#1f2937", textAlign: "center" }}>Accessibility</h3>
              <p style={{ color: "#4b5563", textAlign: "center" }}>We are committed to making educational information accessible to all stakeholders.</p>
            </div>
          </div>
        </section>

        {/* Partner Institutions */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center", color: "#1e3a8a" }}>Our Partner Institutions</h2>
          <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "2rem" }}>
            Proud to collaborate with leading educational institutions across India.
          </p>
          
          {/* Client Logo Carousel Component */}
          <ClientLogos />
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;