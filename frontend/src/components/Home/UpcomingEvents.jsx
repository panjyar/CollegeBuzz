import React from "react";
import EventCard from "./EventCard.jsx";

const UpcomingEvents = ({ events, handleTabChange }) => {
  return (
    <div className="upcoming-events-section">
      <h2 style={{ 
        fontSize: "1.75rem", 
        fontWeight: "600", 
        marginBottom: "1.5rem", 
        color: "#1e40af",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        Upcoming Events
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleTabChange("upcoming_events");
          }}
          style={{
            fontSize: "1rem",
            color: "#1e40af",
            textDecoration: "none"
          }}
        >
          View All →
        </a>
      </h2>
      <div className="event-cards" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;