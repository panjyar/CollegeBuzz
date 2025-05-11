// src/components/About/ClientLogoSlider.jsx
import React, { useEffect, useRef } from "react";

const ClientLogoSlider = () => {
  // Create references to the slider containers
  const sliderOneRef = useRef(null);
  const sliderTwoRef = useRef(null);

  // Array of dummy college logos (placeholder images)
  // In a real implementation, replace these with actual college logos
  const dummyLogos = [
    { id: 1, name: "IIT Delhi", color: "#3B82F6" },
    { id: 2, name: "IIT Bombay", color: "#10B981" },
    { id: 3, name: "NIT Trichy", color: "#F59E0B" },
    { id: 4, name: "IIIT Hyderabad", color: "#EF4444" },
    { id: 5, name: "VIT Vellore", color: "#8B5CF6" },
    { id: 6, name: "BITS Pilani", color: "#EC4899" },
    { id: 7, name: "IIT Madras", color: "#6366F1" },
    { id: 8, name: "Anna University", color: "#14B8A6" },
    { id: 9, name: "Delhi University", color: "#F97316" },
    { id: 10, name: "IIT Kharagpur", color: "#84CC16" }
  ];

  // Duplicate the array to ensure smooth infinite animation
  const logosForSliderOne = [...dummyLogos, ...dummyLogos];
  const logosForSliderTwo = [...dummyLogos.reverse(), ...dummyLogos.reverse()];

  // Animation effect
  useEffect(() => {
    // Animation speeds
    const animationSpeed1 = 30; // seconds for one complete cycle
    const animationSpeed2 = 40; // different speed for second slider
    
    // Set up the animation for first slider
    if (sliderOneRef.current) {
      const sliderWidth = sliderOneRef.current.scrollWidth / 2; // Half because we duplicated the items
      
      // Calculate animation duration based on width and desired speed
      const keyframes = `
        @keyframes scroll1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${sliderWidth}px); }
        }
      `;
      
      // Create and append style element for keyframes
      const styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(keyframes));
      document.head.appendChild(styleElement);
      
      // Apply animation to slider
      sliderOneRef.current.style.animation = `scroll1 ${animationSpeed1}s linear infinite`;
    }
    
    // Set up the animation for second slider (opposite direction)
    if (sliderTwoRef.current) {
      const sliderWidth = sliderTwoRef.current.scrollWidth / 2;
      
      const keyframes = `
        @keyframes scroll2 {
          0% { transform: translateX(-${sliderWidth}px); }
          100% { transform: translateX(0); }
        }
      `;
      
      const styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(keyframes));
      document.head.appendChild(styleElement);
      
      sliderTwoRef.current.style.animation = `scroll2 ${animationSpeed2}s linear infinite`;
    }
    
    return () => {
      // Clean up animations if component unmounts
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('keyframes scroll1') || style.textContent.includes('keyframes scroll2')) {
          document.head.removeChild(style);
        }
      });
    };
  }, []);

  // Logo item component
  const LogoItem = ({ logo }) => (
    <div 
      className="logo-item"
      style={{
        minWidth: "180px",
        height: "100px",
        margin: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        padding: "1rem"
      }}
    >
      {/* This would typically be an image */}
      <div style={{
        width: "60px",
        height: "60px",
        backgroundColor: logo.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem"
      }}>
        {logo.name.substring(0, 2)}
      </div>
      <span style={{ marginLeft: "1rem", color: "#334155", fontWeight: "500" }}>{logo.name}</span>
    </div>
  );

  return (
    <div className="logo-slider-container" style={{ overflow: "hidden" }}>
      {/* First slider - left to right */}
      <div 
        className="logo-slider"
        ref={sliderOneRef}
        style={{
          display: "flex",
          width: "max-content", // Allow content to determine width
          marginBottom: "2rem"
        }}
      >
        {logosForSliderOne.map((logo, index) => (
          <LogoItem key={`slider1-${logo.id}-${index}`} logo={logo} />
        ))}
      </div>
      
      {/* Second slider - right to left (using different order) */}
      <div 
        className="logo-slider"
        ref={sliderTwoRef}
        style={{
          display: "flex",
          width: "max-content"
        }}
      >
        {logosForSliderTwo.map((logo, index) => (
          <LogoItem key={`slider2-${logo.id}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
};

export default ClientLogoSlider;