import React from "react";
import { Clock } from "lucide-react";
import { fieldMappings } from "../../utils/fieldMappings.js";
import { getCollegeName } from "../../utils/collegeMapper.js";

const ContentItem = ({ item, activeTab, index, totalItems, searchTerm }) => {
  const collegeName = getCollegeName(item[fieldMappings[activeTab]?.link]);
  
  // Highlight text that matches the search query
  const highlightMatch = (text, term) => {
    if (!term || !text || typeof text !== 'string') return text;
    
    try {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      
      return (
        <>
          {parts.map((part, i) => 
            part.toLowerCase() === term.toLowerCase() 
              ? <span key={i} style={{ backgroundColor: "#fffbeb", fontWeight: "600" }}>{part}</span> 
              : part
          )}
        </>
      );
    } catch (e) {
      // If regex fails, just return the original text
      return text;
    }
  };
  
  const title = item[fieldMappings[activeTab]?.title];
  const date = item[fieldMappings[activeTab]?.date];

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
        {searchTerm ? highlightMatch(title, searchTerm) : title}
      </a>
      
      {fieldMappings[activeTab]?.date && date && (
        <div style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#4b5563", marginBottom: "0.35rem" }}>
          <Clock size={14} style={{ marginRight: "0.35rem" }} />
          <span>{searchTerm ? highlightMatch(date, searchTerm) : date}</span>
        </div>
      )}
      
      <p className="college-name" style={{ fontSize: "0.9rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
        {searchTerm ? highlightMatch(collegeName, searchTerm) : collegeName}
      </p>
    </li>
  );
};

export default ContentItem;