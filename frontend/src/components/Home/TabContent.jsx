import React from "react";
import ContentItem from "../common/ContentItem.jsx";

const TabContent = ({ data, activeTab }) => {
  return (
    <div className="content-box" style={{
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      marginBottom: "2rem",
      border: "1px solid #e5e7eb"
    }}>
      {data[activeTab] && data[activeTab].length > 0 ? (
        <>
          {/* Optional: Show result count when filtered */}
          {data[activeTab].length < (data[`original_${activeTab}`]?.length || Infinity) && (
            <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#6b7280" }}>
              Showing {data[activeTab].length} results
            </div>
          )}
          
          <ul className="content-list" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {data[activeTab].map((item, index) => (
              <ContentItem 
                key={index} 
                item={item} 
                activeTab={activeTab} 
                index={index} 
                totalItems={data[activeTab].length} 
              />
            ))}
          </ul>
        </>
      ) : (
        <p className="no-data" style={{ textAlign: "center", color: "#6b7280", padding: "2rem 0" }}>No data available.</p>
      )}
    </div>
  );
};

export default TabContent;