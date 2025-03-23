import React from "react";
import { categories } from "../../utils/fieldMappings.js";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default Tabs;