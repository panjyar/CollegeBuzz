export const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
        let date;
        if (typeof dateString === 'object' && dateString.$date) {
            date = new Date(dateString.$date);
        } else {
            date = new Date(dateString);
        }
        
        if (isNaN(date.getTime())) return 'Invalid date';
        
        // Use toLocaleDateString with explicit UTC timezone
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // This forces display in UTC timezone
        });
    } catch (error) {
        console.error("Date parsing error:", error);
        return 'Invalid date';
    }
  };

export const isDateInRange = (dateStr, fromDate, toDate) => {
  if (!dateStr) return true;
  if (!fromDate && !toDate) return true;
  
  let date;
  if (typeof dateStr === 'object' && dateStr.$date) {
      date = new Date(dateStr.$date);
  } else {
      date = new Date(dateStr);
  }
  
  if (isNaN(date.getTime())) return false;
  
  if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return date >= from && date <= to;
  } else if (fromDate) {
      const from = new Date(fromDate);
      return date >= from;
  } else if (toDate) {
      const to = new Date(toDate);
      return date <= to;
  }
  
  return true;
};