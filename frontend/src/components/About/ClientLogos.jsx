// src/components/About/ClientLogoSlider.jsx
import React, { useEffect, useRef } from "react";

// Import logos
import citkLogo from "../../assets/citk.png";
import iitBhilaiLogo from "../../assets/IITBhilai.png";
import iitBombayLogo from "../../assets/File_Indian_Institute_of_Technology_Bombay_Logo.svg";
import iitBhuLogo from "../../assets/iitbhu.png";
import iitGuwahatiLogo from "../../assets/iitg.png";
import iitJodhpurLogo from "../../assets/iitjodhpur.png";
import iitKanpurLogo from "../../assets/iitkanpur.png";
import iitMadrasLogo from "../../assets/iitm.png";
import iitPatnaLogo from "../../assets/iitp.png";
import nitTrichyLogo from "../../assets/nitw.png";
import vitLogo from "../../assets/vit.png";
import iitb from "../../assets/iitb.png";
import iitm from "../../assets/IIT_Mandi.svg.png";
import iitj from "../../assets/iitj.png";
import iitkanpur from "../../assets/iitkanpur.png";

import iitp from "../../assets/iitp.png";
import iitropar from "../../assets/iitropar.png";
import iitt from "../../assets/iitt.png";
import iitmnit from "../../assets/mnit.png";
import nitc from "../../assets/nitc.png";
import nitdurga from "../../assets/nitdurga.png";
import nitj from "../../assets/nitj.png";
import nitk from "../../assets/nitkarnataka.png";
import nitkk from "../../assets/nitkashmire.png";
import nitp from "../../assets/nitp.png";
import nitw from "../../assets/nitw.png";
import nits from "../../assets/nits.png";
import vit from "../../assets/vit.png";

const ClientLogoSlider = () => {
  // Create references to the slider containers
  const sliderOneRef = useRef(null);
  const sliderTwoRef = useRef(null);

  // Array of dummy college logos (placeholder images)
  // In a real implementation, replace these with actual college logos
 const dummyLogos = [
  { id: 1, name: "CIT Kokrajhar", logo: citkLogo },
  { id: 2, name: "IIT Bhilai", logo: iitBhilaiLogo },
  { id: 3, name: "IIT Bombay", logo: iitb },
  { id: 4, name: "IIT BHU", logo: iitBhuLogo },
  { id: 5, name: "IIT Guwahati", logo: iitGuwahatiLogo },
  { id: 6, name: "IIT Jodhpur", logo: iitJodhpurLogo },
  { id: 7, name: "IIT Kanpur", logo: iitKanpurLogo },
  { id: 8, name: "IIT Madras", logo: iitMadrasLogo },
  { id: 9, name: "IIT Patna", logo: iitPatnaLogo },
  { id: 10, name: "NIT Trichy", logo: nitTrichyLogo },
  { id: 11, name: "VIT Vellore", logo: vitLogo },
  { id: 12, name: "IIT mandi", logo: iitm },
  { id: 13, name: "IIT Kanpur", logo: iitj },
  { id: 14, name: "IIT Patna", logo: iitp },
  { id: 15, name: "IIT Ropar", logo: iitropar },
  { id: 16, name: "IIT Tirupati", logo: iitt },
  { id: 17, name: "MNIT Jaipur", logo: iitmnit },
  { id: 18, name: "NIT Calicut", logo: nitc },
  { id: 19, name: "NIT Durgapur", logo: nitdurga },
  { id: 20, name: "NIT Jamshedpur", logo: nitj },
  { id: 21, name: "NIT Karnataka", logo: nitk },
  { id: 22, name: "NIT Kashmir", logo: nitkk },
  { id: 23, name: "NIT Patna", logo: nitp },
  { id: 24, name: "NIT Warangal", logo: nitw },
  { id: 25, name: "NIT Silchar", logo: nits },
  { id: 26, name: "VIT Vellore", logo: vit },
  { id: 27, name: "IIT Kanpur", logo: iitkanpur },
  { id: 28, name: "IIT Bombay", logo: iitBombayLogo },
  { id: 29, name: "IIT BHU", logo: iitBhuLogo },
  { id: 30, name: "IIT Guwahati", logo: iitGuwahatiLogo },
  { id: 31, name: "IIT Jodhpur", logo: iitJodhpurLogo },

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
    {/* Show Image if logo.logo exists */}
    {logo.logo ? (
      <img 
        src={logo.logo} 
        alt={logo.name}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "contain",
          borderRadius: "5px",
        }}
      />
    ) : (
      // fallback if no logo is available
      <div style={{
        width: "60px",
        height: "60px",
        backgroundColor: logo.color || "#ccc",
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
    )}
    <span style={{ marginLeft: "1rem", color: "#334155", fontWeight: "500" }}>
      {logo.name}
    </span>
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