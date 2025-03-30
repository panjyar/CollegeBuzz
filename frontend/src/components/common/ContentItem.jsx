import React from 'react';
import { formatDate } from '../../utils/dateUtils';

const ContentItem = ({ item, activeTab, index, totalItems, searchTerm }) => {
  // Ensure correct mapping for different tabs
  const renderItemContent = () => {
    switch(activeTab) {
      case 'research':
        return {
          title: item.research || "No Title",
          link: item.research_url || "#",
          publishedAt: item.crawled_at || null
        };

      case 'tenders':
        return {
          title: item.tender_title || "No Title",
          link: item.tender_url || "#",
          publishedAt: item.crawled_at || null
        };

      case 'upcoming_events':
        return {
          title: item.upcoming_Event_title || "No Title",
          link: item.upcoming_Event_url || "#",
          publishedAt: item.crawled_at || null,
          additionalInfo: `Date: ${item.upcoming_Event_date || "N/A"} ${item.upcoming_Event_year || ''}`
        };

      case 'admissions':
        return {
          title: item.admission || "No Title",
          link: item.admission_url || "#",
          publishedAt: item.crawled_at || null,
        };

      case 'news':
        return {
          title: item.news || "No Title",
          link: item.news_url || "#",
          publishedAt: item.crawled_at || null,
        };

      case 'notices':
        return {
          title: item.notice_title || "No Title",
          link: item.notice_url || "#",
          publishedAt: item.crawled_at || null,
        };

      case 'recruitments':
        return {
          title: item.recruitment_title || "No Title",
          link: item.recruitment_url || "#",
          publishedAt: item.crawled_at || null,
        };

      default:
        return {
          title: item.title || 'Untitled',
          link: item.link || "#",
          publishedAt: item.published_at || null
        };
    }
  };

  const { title, link, publishedAt, additionalInfo } = renderItemContent();

  return (
    <li 
      style={{
        borderBottom: index < totalItems - 1 ? '1px solid #e5e7eb' : 'none',
        paddingBottom: '1rem',
        marginBottom: '1rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem', color: '#1f2937' }}>
            {title}
          </h3>
          
          {additionalInfo && (
            <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
              {additionalInfo}
            </p>
          )}
          
          {publishedAt && (
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem', display: 'block' }}>
              Published: {formatDate(publishedAt)}
            </span>
          )}
        </div>
        
        {link !== "#" && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            View Details
          </a>
        )}
      </div>
    </li>
  );
};

export default ContentItem;
