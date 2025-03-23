import React from "react";
import ResearchCard from "./ResearchCard.jsx";

const ResearchPapers = ({ papers, handleTabChange }) => {
  if (!papers || papers.length === 0) return null;
  
  return (
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
        {papers.map((paper, index) => (
          <ResearchCard key={index} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default ResearchPapers;