import React, { useState, useEffect } from 'react';
import ContentItem from '../common/ContentItem.jsx';
import ViewArchivedButton from '../common/ViewArchivedButton.jsx';
import { fetchActiveRecords } from '../../services/apiServices.js';
import { sortContentByType, getTitleField, removeDuplicates } from '../../utils/sortingUtils.js';

const TabContent = ({ activeTab }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest'); // Default sort option
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // Fetch data from API
        const data = await fetchActiveRecords(activeTab);
        
        // Remove duplicates based on title field
        const titleField = getTitleField(activeTab);
        const uniqueData = removeDuplicates(data, titleField);
        
        // Sort content based on activeTab type
        const sortedData = sortContentByType(uniqueData, activeTab);
        
        setContent(sortedData);
      } catch (error) {
        console.error(`Error loading ${activeTab}:`, error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [activeTab]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter content based on search term
  const filteredContent = content.filter(item => {
    const titleField = getTitleField(activeTab);
    const title = item?.[titleField] || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    
    let sortedContent;
    if (e.target.value === 'newest') {
      sortedContent = sortContentByType(content, activeTab);
    } else if (e.target.value === 'oldest') {
      // For oldest, we reverse the default sorting
      sortedContent = [...sortContentByType(content, activeTab)].reverse();
    } else if (e.target.value === 'alphabetical') {
      const titleField = getTitleField(activeTab);
      sortedContent = [...content].sort((a, b) => {
        const titleA = a[titleField]?.toLowerCase() || '';
        const titleB = b[titleField]?.toLowerCase() || '';
        return titleA.localeCompare(titleB);
      });
    }
    
    setContent(sortedContent);
  };
  
  return (
    <div id="tab-content-section" className="tab-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="tab-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>{activeTab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
            
            {/* Sort dropdown */}
            <div className="sort-control">
              <label htmlFor="sort-select" style={{ marginRight: '0.5rem' }}>Sort by:</label>
              <select 
                id="sort-select" 
                value={sortOption} 
                onChange={handleSortChange}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db'
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>
          
          {filteredContent.length > 0 ? (
            <ul className="content-list" style={{ listStyleType: 'none', padding: 0 }}>
              {filteredContent.map((item, index) => (
                <ContentItem 
                  key={index}
                  item={item}
                  activeTab={activeTab}
                  index={index}
                  totalItems={filteredContent.length}
                  searchTerm={searchTerm}
                />
              ))}
            </ul>
          ) : (
            <div className="no-content" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p>No {activeTab.replace('_', ' ')} found</p>
            </div>
          )}
          
          <ViewArchivedButton category={activeTab} />
        </>
      )}
    </div>
  );
};

export default TabContent;