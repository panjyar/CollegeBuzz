import React from "react";
import { BookOpen } from "lucide-react";
import { fieldMappings } from "../../utils/fieldMappings.js";
import { getCollegeName } from "../../utils/collegeMapper.js";

const ResearchCard = ({ paper }) => {
  const collegeName = getCollegeName(paper[fieldMappings.research.link]);
  
  return (
    <div className="research-paper-card" style={{
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
};

export default ResearchCard;