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
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:5000/")
        .then((response) => {
          setData(response.data);

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
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Advanced filter function
  const filterData = (items, tabKey) => {
    if (!searchQuery || !items) return items; // If no search query, return full list

    return items.filter((item) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      // Get mappings for this tab
      const mapping = fieldMappings[tabKey];
      if (!mapping) return false;
      
      // Check title match
      const title = item[mapping.title]?.toLowerCase() || "";
      const titleMatch = title.includes(lowerCaseQuery);
      
      // Check college name match
      const collegeLink = item[mapping.link];
      const collegeName = getCollegeName(collegeLink)?.toLowerCase() || "";
      const collegeMatch = collegeName.includes(lowerCaseQuery);
      
      // Check for category-specific keywords
      const isTenderSearch = lowerCaseQuery.includes("tender");
      const isAdmissionSearch = lowerCaseQuery.includes("admission");
      const isNoticeSearch = lowerCaseQuery.includes("notice");
      const isRecruitmentSearch = lowerCaseQuery.includes("recruitment");
      
      // Check if title contains any of these categories
      const categoryMatch = 
        (isTenderSearch && title.includes("tender")) ||
        (isAdmissionSearch && title.includes("admission")) ||
        (isNoticeSearch && title.includes("notice")) ||
        (isRecruitmentSearch && title.includes("recruitment"));
      
      // Return true if any of the conditions match
      return titleMatch || collegeMatch || categoryMatch;
    });
  };

  // Create filtered data object for all tabs
  const filteredData = Object.keys(data).reduce((acc, tabKey) => {
    acc[tabKey] = filterData(data[tabKey], tabKey);
    return acc;
  }, {});

  // Filter featured sections
  const filteredEvents = filterData(featuredEvents, "upcoming_events");
  const filteredResearch = filterData(featuredResearch, "research");

  return (
    <Layout handleTabChange={setActiveTab}>
      <HeroSection isAuthenticated={isAuthenticated} />

      {isAuthenticated ? (
        <div className="main-content" style={{ padding: "0 2rem" }}>
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          
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
          />
          
          {/* Show "No results" message if search is active but no results found */}
          {searchQuery && Object.keys(filteredData).every(key => 
            !filteredData[key] || filteredData[key].length === 0
          ) && (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              backgroundColor: "#f9fafb", 
              borderRadius: "0.5rem",
              margin: "1rem 0" 
            }}>
              <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                No results found for "{searchQuery}". Try a different search term.
              </p>
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