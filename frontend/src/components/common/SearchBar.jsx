import React, { useState } from "react";
import { Search, Calendar, School, Tag, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    keyword: "",
    college: "",
    category: "",
    dateFrom: "",
    dateTo: ""
  });

  // Handle basic search
  const handleBasicSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Handle advanced search submission
  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    // Build query string with all filters
    const filters = { ...advancedFilters };
    onSearch(filters);
  };

  // Update advanced filter
  const handleFilterChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setAdvancedFilters({
      keyword: "",
      college: "",
      category: "",
      dateFrom: "",
      dateTo: ""
    });
  };

  // Toggle between basic and advanced search
  const toggleSearchMode = () => {
    setAdvancedMode(!advancedMode);
    if (advancedMode) {
      // Reset to basic search
      setSearchTerm("");
      resetFilters();
      onSearch("");
    }
  };

  return (
    <div className="search-container" style={{ 
      margin: "1.5rem 0", 
      maxWidth: "100%",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      backgroundColor: "white",
      padding: "1rem"
    }}>
      {!advancedMode ? (
        /* Basic Search */
        <form onSubmit={handleBasicSearch} style={{ display: "flex", width: "100%" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="Search by college, tender, admission, notices, recruitment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                fontSize: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem 0 0 0.375rem",
                outline: "none",
              }}
            />
            <Search size={18} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
          </div>
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
      ) : (
        /* Advanced Search */
        <form onSubmit={handleAdvancedSearch}>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {/* Keyword search */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Keyword
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by any keyword..."
                    value={advancedFilters.keyword}
                    onChange={(e) => handleFilterChange("keyword", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem 0.6rem 2.25rem",
                      fontSize: "0.9rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      outline: "none",
                    }}
                  />
                  <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
                </div>
              </div>

              {/* College search */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  College
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by college name..."
                    value={advancedFilters.college}
                    onChange={(e) => handleFilterChange("college", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem 0.6rem 2.25rem",
                      fontSize: "0.9rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      outline: "none",
                    }}
                  />
                  <School size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
                </div>
              </div>

              {/* Category dropdown */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Category
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={advancedFilters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem 0.6rem 2.25rem",
                      fontSize: "0.9rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      outline: "none",
                      appearance: "none",
                      backgroundColor: "white"
                    }}
                  >
                    <option value="">All Categories</option>
                    <option value="tender">Tenders</option>
                    <option value="admission">Admissions</option>
                    <option value="notice">Notices</option>
                    <option value="recruitment">Recruitment</option>
                    <option value="research">Research</option>
                    <option value="events">Events</option>
                  </select>
                  <Tag size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
                </div>
              </div>

              {/* Date range */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Date Range
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input
                      type="date"
                      value={advancedFilters.dateFrom}
                      onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        fontSize: "0.9rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        outline: "none",
                      }}
                    />
                  </div>
                  <span style={{ alignSelf: "center", color: "#6b7280" }}>to</span>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input
                      type="date"
                      value={advancedFilters.dateTo}
                      onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        fontSize: "0.9rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={resetFilters}
              style={{
                padding: "0.6rem 1rem",
                backgroundColor: "white",
                color: "#4b5563",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}
            >
              <X size={14} />
              Reset Filters
            </button>
            
            <button
              type="submit"
              style={{
                padding: "0.6rem 1.5rem",
                backgroundColor: "#1e40af",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Apply Filters
            </button>
          </div>
        </form>
      )}

      {/* Toggle between basic and advanced search */}
      <div style={{ marginTop: "0.75rem", textAlign: "right" }}>
        <button
          type="button"
          onClick={toggleSearchMode}
          style={{
            background: "none",
            border: "none",
            color: "#1e40af",
            cursor: "pointer",
            fontSize: "0.9rem",
            textDecoration: "underline",
          }}
        >
          {advancedMode ? "Switch to Basic Search" : "Advanced Search Options"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;