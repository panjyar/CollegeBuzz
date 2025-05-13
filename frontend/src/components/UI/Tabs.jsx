// src/components/UI/Tabs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ activeTab, setActiveTab, collections }) => {
  const getDisplayName = (technicalName) => {
    return technicalName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="tabs-container" style={{ marginBottom: '1rem' }}>
      <div
        className="tabs"
        style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '0.5rem',
          background: 'linear-gradient(90deg, #f0f4ff, #ffffff)',
          borderRadius: '0.75rem',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        {collections.map((tabName) => (
          <Link
            key={tabName}
            to={`/home/${tabName}`}
            className={`tab ${activeTab === tabName ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tabName);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              marginRight: '0.75rem',
              cursor: 'pointer',
              borderBottom: activeTab === tabName ? '3px solid #6366f1' : '3px solid transparent',
              fontWeight: activeTab === tabName ? '700' : '500',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              borderRadius: '9999px',
              background: activeTab === tabName ? 'linear-gradient(90deg, #6366f1, #60a5fa)' : 'transparent',
              transition: 'all 0.3s ease-in-out',
              boxShadow: activeTab === tabName ? '0px 4px 8px rgba(99, 102, 241, 0.4)' : 'none',
          }}

        onMouseEnter={(e) => {
              if (activeTab !== tabName) {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#2563eb'; // <-- here
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tabName) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#334155'; // <-- and here
              }
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
