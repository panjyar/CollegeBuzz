import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-container" style={{ margin: "1.5rem 0", maxWidth: "100%" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
        <input
          type="text"
          placeholder="Search by college name, tender, admission, notices, recruitment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem 0 0 0.375rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "0 0.375rem 0.375rem 0",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;