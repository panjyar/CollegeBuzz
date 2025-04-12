import React, { useState } from "react";
import { Search, Calendar, School, Tag, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    keyword: "",
    publisher: "",
    publishedBy: "",
    title: "",
    college: "",
    category: "",
    dateFrom: "",
    dateTo: ""
  });

  // Handle basic search with case insensitivity and partial matching
  const handleBasicSearch = (e) => {
    e.preventDefault();
    
    // Parse the basic search term to detect special queries
    const parsedQuery = parseBasicSearchQuery(searchTerm);
    
    // Add partial matching flag
    const searchParams = {
      ...parsedQuery,
      partialMatch: true
    };
    
    onSearch(searchParams);
  };

  // Parse basic search query to detect specific field searches
  const parseBasicSearchQuery = (query) => {
    // Convert to lowercase for case-insensitive comparison
    const lowerQuery = query.toLowerCase();
    const result = { partialMatch: true };
    
    // Check for special prefixes in the query
    if (lowerQuery.includes("published by:")) {
      const parts = query.split(/published by:/i);
      if (parts.length > 1) {
        result.publishedBy = parts[1].trim();
      }
    } 
    else if (lowerQuery.includes("publisher:")) {
      const parts = query.split(/publisher:/i);
      if (parts.length > 1) {
        result.publisher = parts[1].trim();
      }
    } 
    else if (lowerQuery.includes("title:")) {
      const parts = query.split(/title:/i);
      if (parts.length > 1) {
        result.title = parts[1].trim();
      }
    } 
    else if (lowerQuery.includes("college:")) {
      const parts = query.split(/college:/i);
      if (parts.length > 1) {
        result.college = parts[1].trim();
      }
    }
    else if (lowerQuery.includes("event date:")) {
      const parts = query.split(/event date:/i);
      if (parts.length > 1) {
        result.eventDate = parts[1].trim();
      }
    } 
    else {
      // No special prefix, treat as general keyword search
      result.keyword = query;
    }
    
    return result;
  };

  // Handle advanced search submission with partial matching enabled
  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    // Build query string with all filters and add partial matching flag
    const filters = { 
      ...advancedFilters,
      partialMatch: true 
    };
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
      publisher: "",
      publishedBy: "",
      title: "",
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
              placeholder="Search by keyword, title, college, publisher, published by... (e.g. 'title: Science')"
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
              width:"30%"
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

              {/* Title search - New field */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Title
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by title (partial matches work)..."
                    value={advancedFilters.title}
                    onChange={(e) => handleFilterChange("title", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem 0.6rem 2.25rem",
                      fontSize: "0.9rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      outline: "none",
                    }}
                  />
                  <Tag size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
                </div>
              </div>

              {/* Publisher search - New field */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Publisher
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by publisher (partial matches work)..."
                    value={advancedFilters.publisher}
                    onChange={(e) => handleFilterChange("publisher", e.target.value)}
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

              {/* Published By search - New field */}
              <div>
                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}>
                  Published By
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search by author/publisher name (partial matches work)..."
                    value={advancedFilters.publishedBy}
                    onChange={(e) => handleFilterChange("publishedBy", e.target.value)}
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
                    placeholder="Search by college name (partial matches work)..."
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
          }}
        >
          {advancedMode ? "Switch to Basic Search" : "Advanced Search Options"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;