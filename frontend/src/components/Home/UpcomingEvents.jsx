import React, { useState, useEffect } from "react";
import { CalendarDays, Newspaper } from "lucide-react"; // Importing icons
import { fetchActiveRecords, fetchArchivedRecords } from "../../services/apiServices.js";
import EventCard from "./EventCard.jsx";
import { handleViewAll } from "../../utils/navigationUtils.js";
import { sortUpcomingEvents, removeDuplicates } from "../../utils/sortingUtils.js";

const UpcomingEvents = ({ events, handleTabChange, showFeatured = false }) => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (events && showFeatured) {
      setRecentEvents(events);
      setIsLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const recentEventsData = await fetchActiveRecords("upcoming_events");
        const archivedEventsData = await fetchArchivedRecords("upcoming_events");

        const uniqueRecentEvents = removeDuplicates(recentEventsData, "upcoming_Event_title");
        const uniqueArchivedEvents = removeDuplicates(archivedEventsData, "upcoming_Event_title");

        const sortedRecentEvents = sortUpcomingEvents(uniqueRecentEvents);
        const sortedArchivedEvents = sortUpcomingEvents(uniqueArchivedEvents);

        setRecentEvents(sortedRecentEvents);
        setArchivedEvents(sortedArchivedEvents);
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
    handleViewAll(handleTabChange, "upcoming_events");
  };

  if (isLoading) {
    return <div>Loading Events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (showFeatured) {
    return (
      <div style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb",
        flex: "1",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Latest Events</h2>
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
            {recentEvents.slice(0, 5).map((event, index) => (
              <div key={event._id?.$oid || index} style={{ marginBottom: index < Math.min(recentEvents.length, 5) - 1 ? "1rem" : "0" }}>
                <EventCard event={{
                  title: event.upcoming_Event_title,
                  date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                  url: event.upcoming_Event_url,
                  crawledAt: event.crawled_at?.$date || event.crawled_at
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full View Mode
  return (
    <div style={{ padding: "1rem" }}>
      {/* Recent Events */}
      <div style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb",
        marginBottom: "2rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <CalendarDays size={22} style={{ color: "#1e40af", flexShrink: 0 }} />
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>Upcoming Events</h2>
        </div>

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
                <EventCard event={{
                  title: event.upcoming_Event_title,
                  date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                  url: event.upcoming_Event_url,
                  crawledAt: event.crawled_at?.$date || event.crawled_at
                }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Archived Events */}
      <div style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e5e7eb"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <Newspaper size={22} style={{ color: "#1e40af", flexShrink: 0 }} />
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>Archived News</h2>
        </div>

        {archivedEvents.length === 0 ? (
          <p>No archived news found.</p>
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
                <EventCard event={{
                  title: event.upcoming_Event_title,
                  date: event.upcoming_Event_date + " " + (event.upcoming_Event_year || ""),
                  url: event.upcoming_Event_url,
                  crawledAt: event.crawled_at?.$date || event.crawled_at,
                  isArchived: true
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
