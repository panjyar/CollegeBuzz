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
import { sampleEventsData } from "../utils/sampleData.js";

const HomePage = ({ searchQuery }) => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("news");
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredResearch, setFeaturedResearch] = useState([]);
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

  // 🔍 Filter Data Based on Search Query
  const filterData = (items) => {
    if (!searchQuery || !items) return items; // If no search query, return full list

    return items.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      return title.includes(searchQuery.toLowerCase());
    });
  };

  // Filter featured sections
  const filteredEvents = filterData(featuredEvents);
  const filteredResearch = filterData(featuredResearch);

  return (
    <Layout handleTabChange={setActiveTab}>
      <HeroSection isAuthenticated={isAuthenticated} />

      {isAuthenticated ? (
        <div className="main-content" style={{ padding: "0 2rem" }}>
          {/* 🔹 Featured Sections */}
          <div className="featured-sections" style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2rem" }}>
            <UpcomingEvents events={filteredEvents} handleTabChange={setActiveTab} />
            <ResearchPapers papers={filteredResearch} handleTabChange={setActiveTab} />
          </div>

          {/* 🔹 Tabs and Content */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabContent data={{ ...data, upcoming_events: filteredEvents, research: filteredResearch }} activeTab={activeTab} />
        </div>
      ) : (
        <LoginRequired />
      )}
    </Layout>
  );
};

export default HomePage;
