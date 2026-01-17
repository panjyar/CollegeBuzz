// src/pages/AnnouncementsPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { fetchActiveRecords } from "../services/apiServices.js";
import Layout from "../components/Layout/Layout.jsx";
import AnnouncementCard from "../components/common/AnnouncementCard.jsx";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";

const categories = [
    { id: "news", label: "News" },
    { id: "notices", label: "Notices" },
    { id: "tenders", label: "Tenders" },
    { id: "upcoming_events", label: "Events" },
    { id: "recruitments", label: "Recruitments" },
    { id: "admissions", label: "Admissions" },
    { id: "research", label: "Research" }
];

const AnnouncementsPage = () => {
    const { tabName } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(tabName || "news");
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Sync tab with URL
    useEffect(() => {
        if (tabName && categories.some(c => c.id === tabName)) {
            setActiveTab(tabName);
        }
    }, [tabName]);

    // Fetch data when tab changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchActiveRecords(activeTab, 50);
                setAnnouncements(data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAnnouncements([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/home/${tab}`);
        setIsMobileFilterOpen(false);
    };

    // Filter announcements by search
    const getSearchableText = (item) => {
        // Combine all possible text fields for search
        const fields = [
            item.title, item.news_title, item.news,
            item.tender_title, item.tender,
            item.upcoming_Event_title, item.upcoming_event_title,
            item.recruitment_title, item.recruitment,
            item.admission, item.admission_title,
            item.research, item.research_title,
            item.college_name, item.college
        ];
        return fields.filter(Boolean).join(' ').toLowerCase();
    };

    const filteredAnnouncements = announcements.filter(item => {
        if (!searchQuery) return true;
        const searchableText = getSearchableText(item);
        return searchableText.includes(searchQuery.toLowerCase());
    });

    const currentCategory = categories.find(c => c.id === activeTab);

    return (
        <Layout handleTabChange={handleTabChange}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem 1.5rem"
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: "2rem"
                }}>
                    <h1 style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#2B2B2B",
                        marginBottom: "0.5rem"
                    }}>
                        {currentCategory?.label || "Announcements"}
                    </h1>
                    <p style={{
                        fontSize: "1rem",
                        color: "#666666"
                    }}>
                        Browse all {currentCategory?.label.toLowerCase()} from AICTE colleges
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    gap: "2rem"
                }}>
                    {/* Desktop Sidebar Filters */}
                    <aside style={{
                        width: "220px",
                        flexShrink: 0
                    }} className="desktop-sidebar">
                        <div style={{
                            position: "sticky",
                            top: "80px"
                        }}>
                            <h3 style={{
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                color: "#B3B3B3",
                                marginBottom: "1rem"
                            }}>
                                Categories
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleTabChange(cat.id)}
                                        style={{
                                            padding: "0.625rem 0.875rem",
                                            backgroundColor: activeTab === cat.id ? "#2B2B2B" : "transparent",
                                            color: activeTab === cat.id ? "#FFFFFF" : "#666666",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "0.9rem",
                                            fontWeight: activeTab === cat.id ? "600" : "400",
                                            textAlign: "left",
                                            cursor: "pointer",
                                            transition: "all 0.15s ease"
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main style={{ flex: 1, minWidth: 0 }}>
                        {/* Search & Mobile Filter Button */}
                        <div style={{
                            display: "flex",
                            gap: "0.75rem",
                            marginBottom: "1.5rem"
                        }}>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.625rem 1rem",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #D4D4D4",
                                borderRadius: "8px"
                            }}>
                                <Search size={18} style={{ color: "#B3B3B3" }} />
                                <input
                                    type="text"
                                    placeholder="Search announcements..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1,
                                        border: "none",
                                        outline: "none",
                                        fontSize: "0.9rem",
                                        backgroundColor: "transparent"
                                    }}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "0.25rem"
                                        }}
                                    >
                                        <X size={16} style={{ color: "#B3B3B3" }} />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                style={{
                                    display: "none",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.625rem 1rem",
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid #D4D4D4",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                                className="mobile-filter-btn"
                            >
                                <Filter size={18} />
                            </button>
                        </div>

                        {/* Results Count */}
                        <p style={{
                            fontSize: "0.875rem",
                            color: "#B3B3B3",
                            marginBottom: "1rem"
                        }}>
                            {isLoading ? "Loading..." : `${filteredAnnouncements.length} announcements found`}
                        </p>

                        {/* Announcements Grid */}
                        {isLoading ? (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "4rem"
                            }}>
                                <div style={{
                                    width: "32px",
                                    height: "32px",
                                    border: "3px solid #D4D4D4",
                                    borderTopColor: "#2B2B2B",
                                    borderRadius: "50%",
                                    animation: "spin 0.8s linear infinite"
                                }} />
                            </div>
                        ) : filteredAnnouncements.length > 0 ? (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                                gap: "1.25rem"
                            }}>
                                {filteredAnnouncements.map((item, index) => (
                                    <AnnouncementCard
                                        key={item._id?.$oid || index}
                                        item={item}
                                        category={activeTab}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                textAlign: "center",
                                padding: "4rem 2rem",
                                backgroundColor: "#F8F8F8",
                                borderRadius: "12px"
                            }}>
                                <p style={{ color: "#666666", fontSize: "1rem" }}>
                                    {searchQuery
                                        ? `No results found for "${searchQuery}"`
                                        : "No announcements available in this category"}
                                </p>
                            </div>
                        )}
                    </main>
                </div>

                {/* Mobile Filter Drawer */}
                {isMobileFilterOpen && (
                    <div style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 1001,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div
                            style={{
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}
                            onClick={() => setIsMobileFilterOpen(false)}
                        />
                        <div style={{
                            backgroundColor: "#FFFFFF",
                            padding: "1.5rem",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px"
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1rem"
                            }}>
                                <h3 style={{ fontWeight: "600", color: "#2B2B2B" }}>Categories</h3>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleTabChange(cat.id)}
                                        style={{
                                            padding: "0.875rem",
                                            backgroundColor: activeTab === cat.id ? "#2B2B2B" : "#F8F8F8",
                                            color: activeTab === cat.id ? "#FFFFFF" : "#2B2B2B",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "1rem",
                                            fontWeight: "500",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
        </Layout>
    );
};

export default AnnouncementsPage;
