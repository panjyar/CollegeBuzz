import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentItem from '../common/ContentItem.jsx';
import ViewArchivedButton from '../common/ViewArchivedButton.jsx';
import { fetchActiveRecords } from '../../services/apiServices.js';
import { sortContentByType, getTitleField, removeDuplicates } from '../../utils/sortingUtils.js';

const TabContent = ({ activeTab }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const data = await fetchActiveRecords(activeTab);
        const titleField = getTitleField(activeTab);
        const uniqueData = removeDuplicates(data, titleField);
        const sortedData = sortContentByType(uniqueData, activeTab);
        setContent(sortedData);
      } catch (error) {
        console.error(`Error loading ${activeTab}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
    setVisibleCount(10);
  }, [activeTab]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setVisibleCount(10);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);

    let sortedContent;
    if (e.target.value === 'newest') {
      sortedContent = sortContentByType(content, activeTab);
    } else if (e.target.value === 'oldest') {
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
    setVisibleCount(10);
  };

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const titleField = getTitleField(activeTab);
  const filteredContent = content.filter(item => {
    const title = item?.[titleField] || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <motion.div
      id="tab-content-section"
      className="tab-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {loading ? (
        <motion.div
          className="loading"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}
        >
          Loading...
        </motion.div>
      ) : (
        <>
          {/* Header and Sort */}
          <div className="tab-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937' }}>
              {activeTab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>

            <div className="sort-control">
              <label htmlFor="sort-select" style={{ marginRight: '0.5rem', fontWeight: '500' }}>Sort:</label>
              <select 
                id="sort-select"
                value={sortOption}
                onChange={handleSortChange}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  background: '#f9fafb'
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>

          {/* Content List */}
          {filteredContent.length > 0 ? (
            <>
              <ul className="content-list" style={{ listStyle: 'none', padding: 0 }}>
                <AnimatePresence>
                  {filteredContent.slice(0, visibleCount).map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      style={{ marginBottom: '1.5rem' }}
                    >
                      <ContentItem 
                        item={item}
                        activeTab={activeTab}
                        index={index}
                        totalItems={filteredContent.length}
                        searchTerm={searchTerm}
                      />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* See More Button */}
              {visibleCount < filteredContent.length && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <motion.button
                    onClick={handleSeeMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.75rem 2rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '9999px',
                      background: 'linear-gradient(90deg, #6366f1, #60a5fa)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
                    }}
                  >
                    See More
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              className="no-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>
                No {activeTab.replace('_', ' ')} found
              </p>
            </motion.div>
          )}

          {/* Archived Button */}
          <ViewArchivedButton category={activeTab} />
        </>
      )}
    </motion.div>
  );
};

export default TabContent;
