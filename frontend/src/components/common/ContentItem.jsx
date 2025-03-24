import React from "react";
import { Clock } from "lucide-react";
import { fieldMappings } from "../../utils/fieldMappings.js";
import { getCollegeName } from "../../utils/collegeMapper.js";

const ContentItem = ({ item, activeTab, index, totalItems }) => {
  const collegeName = getCollegeName(item[fieldMappings[activeTab]?.link]);
  
  // Highlight text that matches the search query
  const highlightMatch = (text, searchQuery) => {
    if (!searchQuery || !text) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <span key={i} style={{ backgroundColor: "#fffbeb", fontWeight: "600" }}>{part}</span> 
        : part
    );
  };

  return (
    <li className="content-item" style={{
      padding: "1rem",
      borderBottom: index < totalItems - 1 ? "1px solid #e5e7eb" : "none",
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
};

export default ContentItem;