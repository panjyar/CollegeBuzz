// src/components/UI/Tabs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ activeTab, setActiveTab, collections }) => {
  // Function to convert technical names to display names
  const getDisplayName = (technicalName) => {
    // Convert snake_case to Title Case
    return technicalName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="tabs-container" style={{ marginBottom: '1rem' }}>
      <div className="tabs" style={{ 
        display: 'flex', 
        borderBottom: '1px solid #e5e7eb',
        overflowX: 'auto',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}>
        {collections.map((tabName) => (
          <Link 
            key={tabName}
            to={`/home/${tabName}`}
            className={`tab ${activeTab === tabName ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default since we're handling navigation
              setActiveTab(tabName);
            }}
            style={{
              padding: '0.75rem 1rem',
              marginRight: '0.5rem',
              cursor: 'pointer',
              borderBottom: activeTab === tabName ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tabName ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === tabName ? '600' : '400',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {getDisplayName(tabName)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;