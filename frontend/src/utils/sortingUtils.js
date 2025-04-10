// src/utils/sortingUtils.js
export const sortByDate = (items, dateField, order = 'desc') => {
    return [...items].sort((a, b) => {
      let dateA, dateB;
      
      // Handle MongoDB date format ($date field)
      if (typeof a[dateField] === 'object' && a[dateField]?.$date) {
        dateA = new Date(a[dateField].$date);
      } else {
        dateA = new Date(a[dateField] || 0);
      }
      
      if (typeof b[dateField] === 'object' && b[dateField]?.$date) {
        dateB = new Date(b[dateField].$date);
      } else {
        dateB = new Date(b[dateField] || 0);
      }
      
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  };
  
  // Special function for upcoming events that sorts by event date and then by crawled date
  export const sortUpcomingEvents = (events) => {
    const now = new Date();
    
    // First, separate future and past events
    const futureEvents = [];
    const pastEvents = [];
    
    events.forEach(event => {
      let eventDate;
      try {
        // Try to extract date from the event date string
        // Assuming format like "January 15, 2023" or similar
        const dateParts = event.upcoming_Event_date.split(' ');
        const year = event.upcoming_Event_year || new Date().getFullYear().toString();
        eventDate = new Date(`${dateParts.join(' ')} ${year}`);
        
        // If date parsing fails, fallback to crawled date
        if (isNaN(eventDate.getTime())) {
          throw new Error('Invalid date');
        }
      } catch (err) {
        // If we can't parse the event date, use crawled date instead
        eventDate = event.crawled_at?.$date ? new Date(event.crawled_at.$date) : new Date(event.crawled_at || 0);
      }
      
      if (eventDate > now) {
        futureEvents.push({ ...event, computedDate: eventDate });
      } else {
        pastEvents.push({ ...event, computedDate: eventDate });
      }
    });
    
    // Sort future events by how soon they will occur (ascending)
    futureEvents.sort((a, b) => a.computedDate - b.computedDate);
    
    // Sort past events by how recently they occurred (descending)
    pastEvents.sort((a, b) => b.computedDate - a.computedDate);
    
    // Clean up the temporary computedDate property
    const sortedEvents = [...futureEvents, ...pastEvents].map(event => {
      const { computedDate, ...rest } = event;
      return rest;
    });
    
    return sortedEvents;
  };
  
  // Function to remove duplicates by a specific field
  export const removeDuplicates = (items, uniqueField) => {
    return Array.from(
      new Map(items.map(item => [item[uniqueField], item])).values()
    );
  };
  
  // Get title field based on activeTab
  export const getTitleField = (activeTab) => {
    switch(activeTab) {
      case 'research': return 'research';
      case 'admissions': return 'admission';
      case 'news': return 'news';
      case 'upcoming_events': return 'upcoming_Event_title';
      case 'notices': return 'notice_title';
      case 'tenders': return 'tender_title';
      case 'recruitments': return 'recruitment_title';
      default: return 'title';
    }
  };
  
  // Sort content based on activeTab type
  export const sortContentByType = (content, activeTab) => {
    if (!content || content.length === 0) return [];
    
    // Make a copy to avoid mutating the original array
    const contentCopy = [...content];
    
    // For upcoming events, use special sorting function
    if (activeTab === 'upcoming_events') {
      return sortUpcomingEvents(contentCopy);
    }
    
    // For all other content types, sort by crawled_at date (newest first)
    return sortByDate(contentCopy, 'crawled_at');
  };