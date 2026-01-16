// src/pages/ArchivedPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import AnnouncementCard from '../components/common/AnnouncementCard.jsx';
import { fetchArchivedRecords } from '../services/apiServices.js';
import { Archive, ChevronLeft } from 'lucide-react';

const categories = [
  { id: "news", label: "News" },
  { id: "notices", label: "Notices" },
  { id: "tenders", label: "Tenders" },
  { id: "upcoming_events", label: "Events" },
  { id: "recruitments", label: "Recruitments" },
  { id: "admissions", label: "Admissions" },
  { id: "research", label: "Research" }
];

const ArchivedPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || "news");
  const [archivedItems, setArchivedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (category && categories.some(c => c.id === category)) {
      setActiveCategory(category);
    }
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchArchivedRecords(activeCategory, 50);
        setArchivedItems(data || []);
      } catch (error) {
        console.error("Error fetching archived data:", error);
        setArchivedItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate(`/archived/${cat}`);
  };

  return (
    <Layout>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1.5rem"
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            color: "#666666",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
        >
          <ChevronLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#F8F8F8",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Archive size={24} style={{ color: "#B3B3B3" }} />
          </div>
          <div>
            <h1 style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#2B2B2B",
              marginBottom: "0.25rem"
            }}>
              Archived Announcements
            </h1>
            <p style={{
              fontSize: "0.9375rem",
              color: "#666666"
            }}>
              Past announcements that are no longer active
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          borderBottom: "1px solid #D4D4D4",
          paddingBottom: "1rem"
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: activeCategory === cat.id ? "#2B2B2B" : "#F8F8F8",
                color: activeCategory === cat.id ? "#FFFFFF" : "#666666",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
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
        ) : archivedItems.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem"
          }}>
            {archivedItems.map((item, index) => (
              <AnnouncementCard
                key={item._id?.$oid || index}
                item={item}
                category={activeCategory}
                isArchived={true}
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
            <Archive size={48} style={{ color: "#D4D4D4", marginBottom: "1rem" }} />
            <p style={{ color: "#666666", fontSize: "1rem" }}>
              No archived {categories.find(c => c.id === activeCategory)?.label.toLowerCase()} found
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default ArchivedPage;