import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import Layout from "../components/Layout/Layout.jsx";
import HeroSection from "../components/Home/HeroSection.jsx";
import UpcomingEvents from "../components/Home/UpcomingEvents.jsx";
import ResearchPapers from "../components/Home/ResearchPapers.jsx";
import Tabs from "../components/UI/Tabs.jsx";
import TabContent from "../components/Home/TabContent.jsx";
import LoginRequired from "../components/Home/LoginRequired.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import { sampleEventsData } from "../utils/sampleData.js";
import { getCollegeName } from "../utils/collegeMapper.js";
import { fieldMappings } from "../utils/fieldMappings.js";

const HomePage = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("news");
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredResearch, setFeaturedResearch] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    query: "", // For basic search
    keyword: "", // For advanced search
    college: "",
    category: "",
    dateFrom: "",
    dateTo: ""
  });
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:5000/")
        .then((response) => {
          setData(response.data);

          // Store the original data for filtering purposes
          const originalData = {};
          Object.keys(response.data).forEach(key => {
            originalData[`original_${key}`] = [...(response.data[key] || [])];
          });
          setData(prev => ({ ...prev, ...originalData }));

          // Set featured events from API or fallback to sample data
          const eventData = response.data.upcoming_events || [];
          setFeaturedEvents(eventData.length > 0 ? eventData.slice(0, 3) : sampleEventsData);

          // Set featured research from API
          const researchData = response.data.research || [];
          setFeaturedResearch(researchData.length > 0 ? researchData.slice(0, 4) : []);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isAuthenticated]);

  // Handle search
  const handleSearch = (searchInput) => {
    if (typeof searchInput === 'string') {
      // Basic search
      setSearchFilters({
        query: searchInput,
        keyword: "",
        college: "",
        category: "",
        dateFrom: "",
        dateTo: ""
      });
      setIsAdvancedSearch(false);
    } else {
      // Advanced search with filters
      setSearchFilters({
        query: "",
        ...searchInput
      });
      setIsAdvancedSearch(true);
    }
  };

  // Checks if a date string is within the specified range
  const isDateInRange = (dateStr, fromDate, toDate) => {
    if (!dateStr) return true; // If no date provided, consider it a match
    if (!fromDate && !toDate) return true; // If no date range specified, consider it a match
    
    const date = new Date(dateStr);
    
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return date >= from && date <= to;
    } else if (fromDate) {
      const from = new Date(fromDate);
      return date >= from;
    } else if (toDate) {
      const to = new Date(toDate);
      return date <= to;
    }
    
    return true;
  };

  // Advanced filter function
  const filterData = (items, tabKey) => {
    if (!items) return [];
    
    // If no search is active, return all items
    if (!isAdvancedSearch && !searchFilters.query) return items;
    
    return items.filter((item) => {
      // Get mappings for this tab
      const mapping = fieldMappings[tabKey];
      if (!mapping) return false;
      
      // For basic search, use the query across all fields
      if (!isAdvancedSearch) {
        const query = searchFilters.query.toLowerCase();
        if (!query) return true;
        
        // Check title match
        const title = item[mapping.title]?.toLowerCase() || "";
        const titleMatch = title.includes(query);
        
        // Check date match (if it looks like a date)
        const dateStr = item[mapping.date];
        const dateMatch = dateStr?.toLowerCase().includes(query);
        
        // Check college name match
        const collegeLink = item[mapping.link];
        const collegeName = getCollegeName(collegeLink)?.toLowerCase() || "";
        const collegeMatch = collegeName.includes(query);
        
        // Check content match if available
        const content = item[mapping.content]?.toLowerCase() || "";
        const contentMatch = content.includes(query);
        
        // Check for category-specific keywords
        const isTenderSearch = query.includes("tender");
        const isAdmissionSearch = query.includes("admission");
        const isNoticeSearch = query.includes("notice");
        const isRecruitmentSearch = query.includes("recruitment");
        const isEventSearch = query.includes("event");
        
        // Check if title contains any of these categories
        const categoryMatch = 
          (isTenderSearch && (title.includes("tender") || tabKey === "tenders")) ||
          (isAdmissionSearch && (title.includes("admission") || tabKey === "admissions")) ||
          (isNoticeSearch && (title.includes("notice") || tabKey === "notices")) ||
          (isRecruitmentSearch && (title.includes("recruitment") || tabKey === "recruitments")) ||
          (isEventSearch && (title.includes("event") || tabKey === "upcoming_events"));
        
        // Return true if any of the conditions match
        return titleMatch || dateMatch || collegeMatch || contentMatch || categoryMatch;
      } 
      
      // For advanced search, check against all the specific filters
      else {
        // Track if all active filters match
        let matches = true;
        
        // Check keyword in title and content
        if (searchFilters.keyword) {
          const keyword = searchFilters.keyword.toLowerCase();
          const title = item[mapping.title]?.toLowerCase() || "";
          const content = item[mapping.content]?.toLowerCase() || "";
          
          if (!title.includes(keyword) && !content.includes(keyword)) {
            matches = false;
          }
        }
        
        // Check college name
        if (searchFilters.college && matches) {
          const collegeFilter = searchFilters.college.toLowerCase();
          const collegeLink = item[mapping.link];
          const collegeName = getCollegeName(collegeLink)?.toLowerCase() || "";
          
          if (!collegeName.includes(collegeFilter)) {
            matches = false;
          }
        }
        
        // Check category
        if (searchFilters.category && matches) {
          // For category, check if the current tab matches or if the title contains the category
          const categoryFilter = searchFilters.category.toLowerCase();
          const title = item[mapping.title]?.toLowerCase() || "";
          const isTabMatch = (
            (categoryFilter === "tender" && tabKey === "tenders") ||
            (categoryFilter === "admission" && tabKey === "admissions") ||
            (categoryFilter === "notice" && tabKey === "notices") ||
            (categoryFilter === "recruitment" && tabKey === "recruitments") ||
            (categoryFilter === "research" && tabKey === "research") ||
            (categoryFilter === "events" && tabKey === "upcoming_events")
          );
          
          const isTitleMatch = title.includes(categoryFilter);
          
          if (!isTabMatch && !isTitleMatch) {
            matches = false;
          }
        }
        
        // Check date range
        if ((searchFilters.dateFrom || searchFilters.dateTo) && matches) {
          const dateStr = item[mapping.date];
          if (!isDateInRange(dateStr, searchFilters.dateFrom, searchFilters.dateTo)) {
            matches = false;
          }
        }
        
        return matches;
      }
    });
  };

  // Create filtered data object for all tabs
  const filteredData = Object.keys(data)
    .filter(key => !key.startsWith('original_')) // Skip original data copies
    .reduce((acc, tabKey) => {
      acc[tabKey] = filterData(data[tabKey], tabKey);
      return acc;
    }, {});

  // Filter featured sections
  const filteredEvents = filterData(featuredEvents, "upcoming_events");
  const filteredResearch = filterData(featuredResearch, "research");

  // Check if search is active
  const isSearchActive = isAdvancedSearch || !!searchFilters.query;

  // Count total results across all tabs
  const totalResults = Object.keys(filteredData).reduce(
    (total, key) => total + (filteredData[key]?.length || 0), 
    0
  );

  return (
    <Layout handleTabChange={setActiveTab}>
      <HeroSection isAuthenticated={isAuthenticated} />

      {isAuthenticated ? (
        <div className="main-content" style={{ padding: "0 2rem" }}>
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Search Results Summary */}
          {isSearchActive && (
            <div style={{ 
              margin: "0.5rem 0 1.5rem", 
              padding: "0.75rem 1rem", 
              backgroundColor: "#f3f4f6", 
              borderRadius: "0.375rem",
              fontSize: "0.95rem",
              color: "#4b5563",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                {totalResults > 0 ? (
                  <span>Found <strong>{totalResults}</strong> results</span>
                ) : (
                  <span>No results found for your search</span>
                )}
                {isAdvancedSearch && (
                  <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
                    {searchFilters.keyword && <span>Keyword: <strong>{searchFilters.keyword}</strong> </span>}
                    {searchFilters.college && <span>College: <strong>{searchFilters.college}</strong> </span>}
                    {searchFilters.category && <span>Category: <strong>{searchFilters.category}</strong> </span>}
                    {(searchFilters.dateFrom || searchFilters.dateTo) && (
                      <span>Date range: <strong>
                        {searchFilters.dateFrom || 'Any'} to {searchFilters.dateTo || 'Any'}
                      </strong></span>
                    )}
                  </div>
                )}
                {!isAdvancedSearch && searchFilters.query && (
                  <span>Search term: <strong>"{searchFilters.query}"</strong></span>
                )}
              </div>
              
              {isSearchActive && (
                <button 
                  onClick={() => {
                    setSearchFilters({
                      query: "",
                      keyword: "",
                      college: "",
                      category: "",
                      dateFrom: "",
                      dateTo: ""
                    });
                    setIsAdvancedSearch(false);
                  }}
                  style={{
                    background: "none",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.8rem",
                    cursor: "pointer"
                  }}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
          
          {/* 🔹 Featured Sections */}
          <div className="featured-sections" style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2rem" }}>
            <UpcomingEvents events={filteredEvents} handleTabChange={setActiveTab} />
            <ResearchPapers papers={filteredResearch} handleTabChange={setActiveTab} />
          </div>

          {/* 🔹 Tabs and Content */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabContent 
            data={{ 
              ...filteredData, 
              upcoming_events: filteredEvents, 
              research: filteredResearch 
            }} 
            activeTab={activeTab}
            searchTerm={isAdvancedSearch ? searchFilters.keyword : searchFilters.query} 
          />
          
          {/* Show "No results" message if search is active but no results found */}
          {isSearchActive && totalResults === 0 && (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              backgroundColor: "#f9fafb", 
              borderRadius: "0.5rem",
              margin: "1rem 0" 
            }}>
              <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "1rem" }}>
                No results found for your search.
              </p>
              <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                <p>Try adjusting your search terms or filters:</p>
                <ul style={{ textAlign: "left", maxWidth: "500px", margin: "1rem auto", lineHeight: "1.5" }}>
                  <li>Check for typos or use more general keywords</li>
                  <li>Try searching in different categories</li>
                  <li>Broaden your date range if you've specified dates</li>
                  <li>Use partial college names instead of full names</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoginRequired />
      )}
    </Layout>
  );
};

export default HomePage;