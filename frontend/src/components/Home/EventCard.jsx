import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { fieldMappings } from "../../utils/fieldMappings.js";

const EventCard = ({ event }) => {
  return (
    <div className="event-card" style={{
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s",
      border: "1px solid #e5e7eb"
    }}>
      <div className="event-card-header" style={{
        backgroundColor: "#1e40af",
        color: "white",
        padding: "1rem",
        position: "relative"
      }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{event[fieldMappings.upcoming_events.title]}</h3>
      </div>
      <div className="event-card-body" style={{ padding: "1.25rem" }}>
        <div className="event-info" style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.75rem",
          color: "#4b5563"
        }}>
          <Calendar size={16} style={{ marginRight: "0.5rem" }} />
          <span>{event[fieldMappings.upcoming_events.date]}, {event[fieldMappings.upcoming_events.year]}</span>
        </div>
        {event[fieldMappings.upcoming_events.location] && (
          <div className="event-location" style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.75rem",
            color: "#4b5563"
          }}>
            <MapPin size={16} style={{ marginRight: "0.5rem" }} />
            <span>{event[fieldMappings.upcoming_events.location]}</span>
          </div>
        )}
        <a href={event[fieldMappings.upcoming_events.link]} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          marginTop: "0.5rem",
          color: "#1e40af",
          fontWeight: "500",
          textDecoration: "none"
        }}>Learn more →</a>
      </div>
    </div>
  );
};

export default EventCard;