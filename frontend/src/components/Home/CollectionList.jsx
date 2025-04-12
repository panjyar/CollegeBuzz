import React from 'react';


const CollectionList = ({ items, title, type }) => {
  // Render function for different collection types
  const renderItem = (item) => {
    switch(type) {
      case 'research':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.research}</h3>
            </div>
            <a 
              href={item.research_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Research
            </a>
          </li>
        );
      
      case 'tenders':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.tender_title}</h3>
            </div>
            <a 
              href={item.tender_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Tender
            </a>
          </li>
        );
      
      case 'upcoming_events':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.upcoming_Event_title}</h3>
              <span className="date">
                {item.upcoming_Event_date} {item.upcoming_Event_year || ''}
              </span>
            </div>
            <a 
              href={item.upcoming_Event_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Event Details
            </a>
          </li>
        );

        case 'admissions':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.admission}</h3>
            </div>
            <a 
              href={item.admissions_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Event Details
            </a>
          </li>
        );

        case 'news':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.news}</h3>
            </div>
            <a 
              href={item.news_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Event Details
            </a>
          </li>
        );

        case 'notices':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.notice_title}</h3>
            </div>
            <a 
              href={item.notice_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Event Details
            </a>
          </li>
        );

        case 'recruitments':
        return (
          <li key={item._id.$oid} className="collection-item">
            <div className="item-header">
              <h3>{item.recruitment_title}</h3>
            </div>
            <a 
              href={item.recruitment_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              View Event Details
            </a>
          </li>
        );

      
      default:
        return null;
    }
  };

  return (
    <div className="collection-list">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map(renderItem)}
        </ul>
      )}
    </div>
  );
};

export default CollectionList;