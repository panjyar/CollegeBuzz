import React, { useState, useEffect } from 'react';
import { fetchArchivedRecords } from '../../services/apiServices.js';
import { getCollegeName } from '../../utils/collegeMapper.js';
import { formatDate } from '../../utils/dateUtils.js';
import { fieldMappings } from '../../utils/fieldMappings.js';

const ArchivedDataView = ({ category }) => {
  const [archivedData, setArchivedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArchivedData = async () => {
      setLoading(true);
      try {
        const data = await fetchArchivedRecords(category);
        setArchivedData(data);
      } catch (error) {
        console.error(`Error loading archived ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadArchivedData();
  }, [category]);

  const renderCardTitle = (item) => {
    const mapping = fieldMappings[category];
    return item[mapping.title] || "No Title";
  };

  const renderCardLink = (item) => {
    const mapping = fieldMappings[category];
    return item[mapping.link] || "#";
  };

  const renderCardDate = (item) => {
    if (category === 'upcoming_events' && item.upcoming_Event_date) {
      return `${item.upcoming_Event_date} ${item.upcoming_Event_year || ''}`;
    }
    return item.crawled_at ? formatDate(item.crawled_at) : "Unknown date";
  };

  return (
    <div className="archived-data-container">
      <h2 className="text-2xl font-bold mb-6">Archived {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : archivedData.length === 0 ? (
        <p>No archived data available for this category.</p>
      ) : (
        <div className="archived-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {archivedData.map((item, index) => {
            const link = renderCardLink(item);
            const collegeName = getCollegeName(link);
            
            return (
              <div key={index} style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                backgroundColor: "#f9fafb",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.2s",
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
              }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#4b5563"
                }}>
                  {renderCardTitle(item)}
                </h3>
                
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "#6b7280", 
                  marginBottom: "0.5rem" 
                }}>
                  Published by: {collegeName}
                </p>
                
                <span style={{
                  fontSize: "0.8rem",
                  color: "#9ca3af",
                  marginBottom: "1rem",
                  display: "block"
                }}>
                  Date: {renderCardDate(item)}
                </span>
                
                <div style={{ marginTop: 'auto' }}>
                  {link !== "#" && (
                    <a 
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        backgroundColor: "#e5e7eb",
                        color: "#4b5563",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        textAlign: "center",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "background-color 0.2s"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#d1d5db";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#e5e7eb";
                      }}
                    >
                      View Details
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivedDataView;