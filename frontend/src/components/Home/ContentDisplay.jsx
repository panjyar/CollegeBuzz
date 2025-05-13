// src/components/Home/ContentDisplay.jsx
import React, { useState, useEffect } from 'react';
import ContentItem from '../common/ContentItem.jsx';
import SearchBar from '../common/SearchBar.jsx';

const ContentDisplay = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://collegebuzz-backend-lto9.onrender.com/api/active');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(lowercaseSearchTerm);
      const collegeMatch = item.collegeName?.toLowerCase().includes(lowercaseSearchTerm);
      const categoryMatch = item.category?.toLowerCase().includes(lowercaseSearchTerm);
      const contentMatch = item.content?.toLowerCase().includes(lowercaseSearchTerm);

      return titleMatch || collegeMatch || categoryMatch || contentMatch;
    });

    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Content */}
      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-xl font-semibold">No results found.</p>
          <p className="mt-2 text-sm">Try searching for a different keyword.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="hover:scale-105 transition-transform duration-300"
            >
              <ContentItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
