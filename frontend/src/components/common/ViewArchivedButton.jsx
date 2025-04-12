import React from 'react';
import { Link } from 'react-router-dom';

const ViewArchivedButton = ({ category }) => {
  return (
    <Link 
      to={`/archived/${category}`}
      style={{
        display: "inline-block",
        backgroundColor: "#f3f4f6",
        color: "#4b5563",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        textDecoration: "none",
        fontSize: "0.9rem",
        marginTop: "1.5rem",
        marginBottom: "1rem",
        border: "1px solid #e5e7eb",
        transition: "all 0.2s"
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#e5e7eb";
        e.target.style.color = "#1f2937";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#f3f4f6";
        e.target.style.color = "#4b5563";
      }}
    >
      View All Archived {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </Link>
  );
};

export default ViewArchivedButton;