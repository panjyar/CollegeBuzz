import React, { useState } from "react";
import { ExternalLink, Calendar } from "lucide-react";

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

// College domain to name mapping
const collegeMapping = {
    'iitdh.ac.in': 'IIT Dharwad',
    'iitgoa.ac.in': 'IIT Goa',
    'iitj.ac.in': 'IIT Jodhpur',
    'iiti.ac.in': 'IIT Indore',
    'iitbbs.ac.in': 'IIT Bhubaneswar',
    'iitk.ac.in': 'IIT Kanpur',
    'iitm.ac.in': 'IIT Madras',
    'iitd.ac.in': 'IIT Delhi',
    'iitb.ac.in': 'IIT Bombay',
    'iitkgp.ac.in': 'IIT Kharagpur',
    'iitr.ac.in': 'IIT Roorkee',
    'iith.ac.in': 'IIT Hyderabad',
    'iitg.ac.in': 'IIT Guwahati',
    'iitp.ac.in': 'IIT Patna',
    'iitmandi.ac.in': 'IIT Mandi',
    'iitbhu.ac.in': 'IIT BHU',
    'iitrpr.ac.in': 'IIT Ropar',
    'iitpkd.ac.in': 'IIT Palakkad',
    'iitjammu.ac.in': 'IIT Jammu',
    'iitbhilai.ac.in': 'IIT Bhilai',
    'iittirupati.ac.in': 'IIT Tirupati',
    'cit.ac.in': 'CIT Kokrajhar',
    'nitk.ac.in': 'NIT Karnataka',
    'nitc.ac.in': 'NIT Calicut',
    'nitt.edu': 'NIT Trichy',
    'nitw.ac.in': 'NIT Warangal',
};

// Helper to extract college name from URL
const getCollegeFromUrl = (url) => {
    if (!url) return null;
    try {
        // Handle URLs that might not have protocol
        const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
        const hostname = new URL(urlWithProtocol).hostname;

        // Check direct mapping first
        if (collegeMapping[hostname]) {
            return collegeMapping[hostname];
        }

        // Check for partial match (e.g., www.iitdh.ac.in matches iitdh.ac.in)
        for (const [domain, name] of Object.entries(collegeMapping)) {
            if (hostname.endsWith(domain) || hostname.includes(domain.split('.')[0])) {
                return name;
            }
        }

        // Fallback: extract readable name from domain
        const parts = hostname.replace('www.', '').split('.');
        if (parts.length >= 2) {
            const collegePart = parts[0].toUpperCase();
            if (collegePart.length <= 6) {
                return collegePart; // Short acronym like IIT, NIT, CIT
            }
            // Capitalize first letter for longer names
            return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }

        return null;
    } catch {
        return null;
    }
};

// Helper to extract domain from URL (for favicon)
const getDomainFromUrl = (url) => {
    if (!url) return null;
    try {
        const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
        return new URL(urlWithProtocol).hostname;
    } catch {
        return null;
    }
};

// College Logo component with fallback
const CollegeLogo = ({ domain, size = 20 }) => {
    const [hasError, setHasError] = useState(false);

    if (!domain || hasError) {
        // Fallback to initials
        const initials = domain ? domain.split('.')[0].substring(0, 3).toUpperCase() : '?';
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: '4px',
                backgroundColor: '#F0F0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: size * 0.4,
                fontWeight: '600',
                color: '#666'
            }}>
                {initials}
            </div>
        );
    }

    return (
        <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
            alt=""
            width={size}
            height={size}
            style={{
                borderRadius: '4px',
                objectFit: 'contain'
            }}
            onError={() => setHasError(true)}
        />
    );
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
    // Try to get college name from item, or extract from URL
    const collegeName = item.college_name || item.college || getCollegeFromUrl(sourceUrl);

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
                    gap: "0.5rem",
                    marginBottom: "0.75rem"
                }}>
                    <CollegeLogo domain={getDomainFromUrl(sourceUrl)} size={18} />
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
