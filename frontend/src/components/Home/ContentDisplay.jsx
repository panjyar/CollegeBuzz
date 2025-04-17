// src/components/Home/ContentDisplay.jsx (new file)
import React, { useState, useEffect } from 'react';
import ContentItem from '../common/ContentItem.jsx';
import SearchBar from '../common/SearchBar.jsx';

const ContentDisplay = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('https://collegebuzz-backend-lto9.onrender.com/api/active');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search functionality
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // If search is empty, show all data
      setFilteredData(data);
      return;
    }

    // Filter data based on search term
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      // Customize these fields based on your actual data structure
      const titleMatch = item.title?.toLowerCase().includes(lowercaseSearchTerm);
      const collegeMatch = item.collegeName?.toLowerCase().includes(lowercaseSearchTerm);
      const categoryMatch = item.category?.toLowerCase().includes(lowercaseSearchTerm);
      const contentMatch = item.content?.toLowerCase().includes(lowercaseSearchTerm);
      
      return titleMatch || collegeMatch || categoryMatch || contentMatch;
    });
    
    setFilteredData(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="content-display">
      {/* <SearchBar onSearch={handleSearch} /> */}
      
      {filteredData.length === 0 ? (
        <div className="no-results">No results found. Try a different search term.</div>
      ) : (
        <div className="content-items">
          {filteredData.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;