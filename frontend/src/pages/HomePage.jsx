// src/pages/HomePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { fetchActiveRecords } from "../services/apiServices.js";
import { useAuth } from "../context/AuthContext.jsx";
import Layout from "../components/Layout/Layout.jsx";
import HeroSection from "../components/Home/HeroSection.jsx";
import UpcomingEvents from "../components/Home/UpcomingEvents.jsx";
import ResearchPapers from "../components/Home/ResearchPapers.jsx";
import Tabs from "../components/UI/Tabs.jsx";
import TabContent from "../components/Home/TabContent.jsx";
import LoginRequired from "../components/Home/LoginRequired.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import { useParams, useNavigate } from "react-router-dom";

const HomePage = () => {
  // State for all data, keyed by collection name (e.g., news, tenders)
  const [allData, setAllData] = useState({});
  const { tabName } = useParams(); // Get tab from URL
  const navigate = useNavigate(); // To programmatically navigate
  
  // Collections to manage
  const collections = [
    "news", "notices", "tenders", 
    "upcoming_events", "recruitments", 
    "admissions", "research"
  ];
  
  // Default to "news" if tabName is invalid or not provided
  const validTabName = collections.includes(tabName) ? tabName : "news";
  
  // Set active tab based on URL param, with validation
  const [activeTab, setActiveTab] = useState(validTabName);

  // States for featured sections (still useful for initial display)
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredResearch, setFeaturedResearch] = useState([]);
  
  // State for search parameters
  const [searchParams, setSearchParams] = useState({}); // Store keyword or advanced filters object
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Handle tab change - update state and URL
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/home/${newTab}`); // update URL
  };

  // Sync active tab with URL parameter when it changes
  useEffect(() => {
    if (tabName && collections.includes(tabName)) {
      setActiveTab(tabName);
    } else if (tabName && !collections.includes(tabName)) {
      // Redirect to a valid tab if an invalid one is provided
      navigate('/home/news', { replace: true });
    }
  }, [tabName, navigate, collections]);

  // Debounce search function to avoid excessive API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to fetch data for a specific collection
  // useCallback to memoize the function
  const fetchDataForCollection = useCallback(async (collectionName, currentSearchParams) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const options = { 
        limit: 50, // Default limit, can be adjusted
        // Pass search parameters to the API
        ...(currentSearchParams?.keyword && { keyword: currentSearchParams.keyword }),
        ...(currentSearchParams?.filters && { filters: currentSearchParams.filters })
      };
      
      console.log(`Fetching ${collectionName} with options:`, options);
      const records = await fetchActiveRecords(collectionName, options);
      
      setAllData(prevData => ({
        ...prevData,
        [collectionName]: records || [] // Ensure it's an array
      }));

      // Update featured sections if fetching initial data (no search params)
      // Or if the search should also filter featured items (more complex)
      if (!currentSearchParams || Object.keys(currentSearchParams).length === 0) {
        if (collectionName === "upcoming_events") {
          // Sort by a date field, e.g., 'crawled_at' or 'event_date' if available
          // Assuming records have a $date field for crawled_at from backend
          const sortedEvents = [...(records || [])].sort((a, b) => 
            new Date(b.crawled_at?.$date || b.last_updated_at?.$date || 0) - 
            new Date(a.crawled_at?.$date || a.last_updated_at?.$date || 0)
          );
          setFeaturedEvents(sortedEvents.slice(0, 5));
        }
        if (collectionName === "research") {
          const sortedResearch = [...(records || [])].sort((a, b) => 
            new Date(b.crawled_at?.$date || b.last_updated_at?.$date || 0) - 
            new Date(a.crawled_at?.$date || a.last_updated_at?.$date || 0)
          );
          setFeaturedResearch(sortedResearch.slice(0, 4));
        }
      }

    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(`Failed to load ${collectionName}.`);
      setAllData(prevData => ({
        ...prevData,
        [collectionName]: [] // Set to empty array on error for this collection
      }));
    } finally {
      setIsLoading(false); // Ideally, manage loading state per collection or globally
    }
  }, [isAuthenticated]); // Dependency: isAuthenticated

  // Initial data load for all collections
  useEffect(() => {
    if (isAuthenticated) {
      collections.forEach(collection => fetchDataForCollection(collection, {})); // Fetch with empty params initially
    } else {
      // Clear data if not authenticated
      setAllData({});
      setFeaturedEvents([]);
      setFeaturedResearch([]);
    }
  }, [isAuthenticated, fetchDataForCollection]); // Add collections to deps if it can change, though it's constant here

  // Effect to re-fetch data when searchParams or activeTab changes
  useEffect(() => {
    if (isAuthenticated && (searchParams.keyword || searchParams.filters)) {
        // If search is active, fetch for the current tab with search params
        fetchDataForCollection(activeTab, searchParams);
    } else if (isAuthenticated && Object.keys(searchParams).length === 0) {
        // If search was cleared, fetch initial data for the current tab
        fetchDataForCollection(activeTab, {});
    }
    // If you want all tabs to update on search, iterate collections:
    // collections.forEach(col => fetchDataForCollection(col, searchParams));
  }, [searchParams, activeTab, isAuthenticated, fetchDataForCollection]);

  // Debounced search handler
  const debouncedFetch = useCallback(debounce((params) => {
    setSearchParams(params); // This will trigger the useEffect above
  }, 500), []);

  const handleSearch = (searchInput) => {
    // searchInput will be an object from SearchBar.jsx:
    // e.g., { keyword: "some text" } OR { title: "...", college: "...", ... }
    // The SearchBar's parseBasicSearchQuery converts "prefix:value" to an object.
    // A plain string from basic search (no prefix) becomes { keyword: "plain string" }
    
    if (typeof searchInput === 'string' && searchInput.trim() === "") { // Basic search cleared
        debouncedFetch({}); // Empty object to signify clear search
    } else if (typeof searchInput === 'string') { // Basic search with a term (should be obj from SearchBar now)
        debouncedFetch({ keyword: searchInput });
    } else if (typeof searchInput === 'object') { // Advanced search or parsed basic search
        // The 'filters' key is what apiServices expects for advanced criteria
        // 'keyword' is a top-level param for apiServices for general keyword search
        const newSearchParams = {};
        if (searchInput.keyword) { // General keyword from basic or advanced
            newSearchParams.keyword = searchInput.keyword;
        }
        // Collect other fields as 'filters'
        const advancedFilterFields = {};
        for (const key in searchInput) {
            if (key !== 'keyword' && searchInput[key]) {
                 advancedFilterFields[key] = searchInput[key];
            }
        }
        if (Object.keys(advancedFilterFields).length > 0) {
            newSearchParams.filters = advancedFilterFields;
        }
        debouncedFetch(newSearchParams);
    } else {
        debouncedFetch({}); // Clear search if input is unexpected
    }
  };
  
  const clearSearch = () => {
    setSearchParams({}); // This will trigger re-fetch of initial data for the current tab
    // Optionally, tell SearchBar to reset its internal state too (if SearchBar needs it)
  };

  const currentTabData = allData[activeTab] || [];
  const totalResults = currentTabData.length; // Total results for the current tab based on API response
  const isSearchActive = !!searchParams.keyword || !!searchParams.filters;

  return (
    <Layout handleTabChange={handleTabChange} activeTab={activeTab}>
      <HeroSection isAuthenticated={isAuthenticated} />

      {isAuthenticated ? (
        <div className="main-content" style={{ padding: "0 1rem", maxWidth: "1200px", margin: "0 auto" }}>
          <SearchBar onSearch={handleSearch} />
          
          {isSearchActive && (
            <div style={{ 
              margin: "0.5rem 0 1.5rem", padding: "0.75rem 1rem", 
              backgroundColor: "#f3f4f6", borderRadius: "0.375rem",
              fontSize: "0.95rem", color: "#4b5563",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <span>
                  {isLoading ? "Searching..." : 
                    (totalResults > 0 ? `Found ${totalResults} results for '${activeTab}'` : `No results found for '${activeTab}'`)
                  }
                </span>
                {/* Display active search criteria - simplified */}
                {(searchParams.keyword || searchParams.filters) && (
                    <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
                        {searchParams.keyword && <span>Keyword: <strong>{searchParams.keyword}</strong> </span>}
                        {searchParams.filters && Object.entries(searchParams.filters).map(([key, value]) => (
                            value ? <span key={key} style={{ marginRight: '10px' }}>{key}: <strong>{String(value)}</strong></span> : null
                        ))}
                    </div>
                )}
              </div>
              <button onClick={clearSearch} /* style your clear button */ >Clear Search</button>
            </div>
          )}
          
          {/* Featured Sections - these might still be from initial load or also filtered if logic is added */}
          {!isSearchActive && ( // Show featured only if no search is active, or adjust logic
            <div className="featured-sections" style={{ display: "flex", flexDirection: "row", gap: "2rem", marginBottom: "2rem" }}>
              <div style={{ flex: "1 1 50%" }}>
                <UpcomingEvents events={featuredEvents} handleTabChange={handleTabChange} showFeatured={true} />
              </div>
              <div style={{ flex: "1 1 50%" }}>
                <ResearchPapers papers={featuredResearch} handleTabChange={handleTabChange} />
              </div>
            </div>
          )}

          <Tabs 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            collections={collections} 
          />
          
          {isLoading && activeTab && <p>Loading {activeTab}...</p>}
          {error && <div className="error-message" style={{ color: 'red', padding: '1rem' }}>{error}</div>}
          
          {!isLoading && !error && (
            <TabContent 
              data={{ [activeTab]: currentTabData }} // Pass only current tab's data
              activeTab={activeTab}
              // searchTerm is not directly needed by TabContent if data is already filtered
            />
          )}
          
          {isSearchActive && !isLoading && totalResults === 0 && (
             <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9fafb", borderRadius: "0.5rem", margin: "1rem 0" }}>
               <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "1rem" }}>
                 No results found for your search in '{activeTab}'.
               </p>
               {/* ... (suggestions for adjusting search) ... */}
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