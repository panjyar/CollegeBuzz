import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import { getCollegeName } from '../../utils/collegeMapper.js';
import { FiBookmark } from 'react-icons/fi'; // News icon
import { FaRegCalendarAlt } from 'react-icons/fa'; // Event icon

const EventCard = ({ event }) => {
  const {
    title,
    date,
    url,
    crawledAt,
    isArchived = false,
    type = "event" // default is event, but can be "news"
  } = event;

  const collegeName = getCollegeName(url);

  const isNews = type === "news";

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "0.75rem",
      padding: "2rem",
      backgroundColor: isArchived ? "#f9fafb" : "white",
      transition: "transform 0.2s",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
    }}>
      
      {/* Label for News or Event */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: isNews ? "#fef3c7" : "#dbeafe",
        color: isNews ? "#92400e" : "#1d4ed8",
        fontWeight: "600",
        fontSize: "0.75rem",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.5rem",
        marginBottom: "1rem"
      }}>
        {isNews ? <FiBookmark style={{ marginRight: "0.3rem" }} /> : <FaRegCalendarAlt style={{ marginRight: "0.3rem" }} />}
        {isNews ? "News" : "Event"}
      </div>

      {/* Event Title */}
      <h3 style={{
        fontSize: "1.1rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
        color: isArchived ? "#6b7280" : "#1f2937"
      }}>
        {title}
      </h3>

      {/* Date and Published date */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem"
      }}>
        <span style={{
          fontSize: "0.9rem",
          color: isArchived ? "#9ca3af" : "#4b5563"
        }}>
          {isNews ? "Published on" : "Event on"}: {date}
        </span>

        {crawledAt && (
          <span style={{
            fontSize: "0.8rem",
            color: "#9ca3af"
          }}>
            Added: {formatDate(crawledAt)}
          </span>
        )}
      </div>

      {/* College name */}
      <p style={{
        fontSize: "0.9rem",
        color: "#6b7280",
        marginBottom: "1rem"
      }}>
        Published by: {collegeName}
      </p>

      {/* View Details Button */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            backgroundColor: isArchived ? "#e5e7eb" : "#3b82f6",
            color: isArchived ? "#4b5563" : "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            textAlign: "center",
            textDecoration: "none",
            fontSize: "0.9rem",
            marginTop: "1rem",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = isArchived
              ? "#d1d5db"
              : "#2563eb";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = isArchived
              ? "#e5e7eb"
              : "#3b82f6";
          }}
        >
          View Details
        </a>
      )}
    </div>
  );
};

export default EventCard;
