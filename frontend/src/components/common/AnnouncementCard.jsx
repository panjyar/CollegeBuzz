import React from "react";
import { ExternalLink, Calendar, Building2 } from "lucide-react";

// Category badge colors
const categoryColors = {
    news: { bg: "#dbeafe", color: "#2563eb" },
    notices: { bg: "#e0e7ff", color: "#6366f1" },
    tenders: { bg: "#fee2e2", color: "#dc2626" },
    upcoming_events: { bg: "#ede9fe", color: "#7c3aed" },
    recruitments: { bg: "#cffafe", color: "#0891b2" },
    admissions: { bg: "#fef3c7", color: "#d97706" },
    research: { bg: "#d1fae5", color: "#059669" },
};

// Helper to extract title based on category
const getTitle = (item, category) => {
    // Try category-specific fields first
    const fieldMappings = {
        news: ['news_title', 'news'],
        notices: ['notice_title', 'notice'],
        tenders: ['tender_title', 'tender'],
        upcoming_events: ['upcoming_Event_title', 'upcoming_event_title', 'event_title'],
        recruitments: ['recruitment_title', 'recruitment'],
        admissions: ['admission', 'admission_title'],
        research: ['research', 'research_title', 'news_title', 'news']
    };

    const fields = fieldMappings[category] || [];
    for (const field of fields) {
        if (item[field]) return item[field];
    }

    // Fallback to common fields
    return item.title || item.name || "Untitled Announcement";
};

// Helper to extract URL based on category
const getSourceUrl = (item, category) => {
    const fieldMappings = {
        news: ['news_url'],
        notices: ['notice_url'],
        tenders: ['tender_url'],
        upcoming_events: ['upcoming_Event_url', 'upcoming_event_url', 'event_url'],
        recruitments: ['recruitment_url'],
        admissions: ['admission_url'],
        research: ['research_url', 'news_url']
    };

    const fields = fieldMappings[category] || [];
    for (const field of fields) {
        if (item[field]) return item[field];
    }

    return item.source_url || item.url || null;
};

// Helper to extract date
const getDate = (item) => {
    return item.published_date || item.crawled_at || item.last_updated_at;
};

const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown date";
    try {
        // Handle MongoDB date format
        const dateStr = dateValue.$date || dateValue;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "Unknown date";
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    } catch {
        return "Unknown date";
    }
};

const getCategoryLabel = (category) => {
    const labels = {
        news: "News",
        notices: "Notice",
        tenders: "Tender",
        upcoming_events: "Event",
        recruitments: "Recruitment",
        admissions: "Admission",
        research: "Research"
    };
    return labels[category] || category;
};

const AnnouncementCard = ({
    item,           // Raw item from API
    category,       // Category name
    isArchived = false
}) => {
    // Extract data using helpers
    const title = getTitle(item, category);
    const sourceUrl = getSourceUrl(item, category);
    const displayDate = getDate(item);
    const collegeName = item.college_name || item.college || null;

    const categoryStyle = categoryColors[category] || { bg: "#f3f4f6", color: "#666" };

    return (
        <article style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: `1px solid ${isArchived ? "#B3B3B3" : "#D4D4D4"}`,
            padding: "1.25rem",
            transition: "all 0.2s ease",
            opacity: isArchived ? 0.7 : 1
        }}
            onMouseEnter={(e) => {
                if (!isArchived) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px -4px rgba(0, 0, 0, 0.1)";
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {/* Top Row: Badge + Date */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
                gap: "0.5rem"
            }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: categoryStyle.bg,
                        color: categoryStyle.color,
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        borderRadius: "4px"
                    }}>
                        {getCategoryLabel(category)}
                    </span>
                    {isArchived && (
                        <span style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "#f3f4f6",
                            color: "#666",
                            fontSize: "0.7rem",
                            fontWeight: "600",
                            borderRadius: "4px"
                        }}>
                            Archived
                        </span>
                    )}
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.75rem",
                    color: "#B3B3B3"
                }}>
                    <Calendar size={12} />
                    {formatDate(displayDate)}
                </div>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#2B2B2B",
                marginBottom: "0.75rem",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
            }}>
                {title}
            </h3>

            {/* College Name */}
            {collegeName && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    marginBottom: "0.75rem"
                }}>
                    <Building2 size={14} style={{ color: "#B3B3B3" }} />
                    <span style={{
                        fontSize: "0.8rem",
                        color: "#666666",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {collegeName}
                    </span>
                </div>
            )}

            {/* Source Link */}
            {sourceUrl && (
                <a
                    href={sourceUrl.startsWith('http') ? sourceUrl : `https://${sourceUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        color: "#2B2B2B",
                        textDecoration: "none",
                        padding: "0.5rem 0.75rem",
                        backgroundColor: "#F8F8F8",
                        borderRadius: "6px",
                        transition: "background-color 0.15s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D4D4D4"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F8F8F8"}
                >
                    View Source
                    <ExternalLink size={12} />
                </a>
            )}
        </article>
    );
};

export default AnnouncementCard;
