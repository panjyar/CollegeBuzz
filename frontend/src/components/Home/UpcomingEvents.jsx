import React, { useState, useEffect } from "react";
import { fetchActiveRecords, fetchArchivedRecords } from "../../services/apiServices.js";
import EventCard from "./EventCard.jsx";

const UpcomingEvents = ({ events, handleTabChange, showFeatured = false }) => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If events are passed as props (from HomePage), use those
    if (events && showFeatured) {
      setRecentEvents(events);
      setIsLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        // Fetch recent and archived events
        let recentEventsData = await fetchActiveRecords("upcoming_events");
        let archivedEventsData = await fetchArchivedRecords("upcoming_events");

        // Remove redundant (duplicate) events using a Set
        const uniqueRecentEvents = Array.from(
          new Map(recentEventsData.map((event) => [event.upcoming_Event_title, event])).values()
        );

        const uniqueArchivedEvents = Array.from(
          new Map(archivedEventsData.map((event) => [event.upcoming_Event_title, event])).values()
        );

        // Sort events by crawled date (newest first)
        uniqueRecentEvents.sort((a, b) => {
          const dateA = a.crawled_at?.$date ? new Date(a.crawled_at.$date) : new Date(0);
          const dateB = b.crawled_at?.$date ? new Date(b.crawled_at.$date) : new Date(0);
          return dateB - dateA;
        });
        
        uniqueArchivedEvents.sort((a, b) => {
          const dateA = a.crawled_at?.$date ? new Date(a.crawled_at.$date) : new Date(0);
          const dateB = b.crawled_at?.$date ? new Date(b.crawled_at.$date) : new Date(0);
          return dateB - dateA;
        });

        setRecentEvents(uniqueRecentEvents);
        setArchivedEvents(uniqueArchivedEvents);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [events, showFeatured]);

  const handleViewAllEvents = () => {
    if (handleTabChange) {
      handleTabChange("upcoming_events");
      // Scroll to the tab content section
      setTimeout(() => {
        const tabContentElement = document.querySelector(".content-box");
        if (tabContentElement) {
          tabContentElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  if (isLoading) {
    return <div>Loading Events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render a featured section (limited to 5) if showFeatured is true
  if (showFeatured) {
    return (
      <div style={{ 
        flex: "1", 
        backgroundColor: "white", 
        padding: "1.5rem", 
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", margin: "0" }}>Featured Events</h2>
          <button 
            onClick={handleViewAllEvents}
            style={{
              backgroundColor: "#f3f4f6",
              border: "none",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              color: "#4b5563"
            }}
          >
            View All
          </button>
        </div>
        
        {recentEvents.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <div>
            {recentEvents.map((event, index) => (
              <div key={event._id?.$oid || index} style={{ marginBottom: index < recentEvents.length - 1 ? "1rem" : "0" }}>
                <EventCard 
                  event={{
                    title: event.upcoming_Event_title,
                    date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                    url: event.upcoming_Event_url,
                    // In the featured section (modify this part):
                    crawledAt: event.crawled_at?.$date || event.crawled_at
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render the full events page for TabContent
  return (
    <div style={{ padding: "1rem" }}>
      {/* Recent Events */}
      <h2>Upcoming Events</h2>
      {recentEvents.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "flex-start"
        }}>
          {recentEvents.map((event, index) => (
            <div key={event._id?.$oid || index} style={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "280px",
              maxWidth: "400px"
            }}>
              <EventCard 
                event={{
                  title: event.upcoming_Event_title,
                  date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                  url: event.upcoming_Event_url,
                  crawledAt: event.crawled_at?.$date || event.crawled_at
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Archived Events */}
      <h2>Archived Events</h2>
      {archivedEvents.length === 0 ? (
        <p>No archived events found.</p>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "flex-start"
        }}>
          {archivedEvents.map((event, index) => (
            <div key={event._id?.$oid || index} style={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "280px",
              maxWidth: "400px"
            }}>
              <EventCard 
                event={{
                  title: event.upcoming_Event_title,
                  date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                  url: event.upcoming_Event_url,
                  crawledAt: event.crawled_at?.$date || event.crawled_at,
                  isArchived: true
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;