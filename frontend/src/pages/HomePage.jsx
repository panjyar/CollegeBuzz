// src/pages/HomePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { fetchActiveRecords } from "../services/apiServices.js";
import Layout from "../components/Layout/Layout.jsx";
import HeroSection from "../components/Home/HeroSection.jsx";
import FeaturesSection from "../components/Home/FeaturesSection.jsx";
import FAQSection from "../components/Home/FAQSection.jsx";
import AnnouncementCard from "../components/common/AnnouncementCard.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const HomePage = () => {
  const [featuredAnnouncements, setFeaturedAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { tabName } = useParams();
  const navigate = useNavigate();

  // Fetch featured announcements (mix of categories)
  useEffect(() => {
    const fetchFeatured = async () => {
      setIsLoading(true);
      try {
        // Fetch from multiple categories for variety
        const [news, events, research] = await Promise.all([
          fetchActiveRecords("news", 3),
          fetchActiveRecords("upcoming_events", 2),
          fetchActiveRecords("research", 1)
        ]);

        // Combine and sort by date
        const combined = [
          ...(news || []).map(item => ({ ...item, category: "news" })),
          ...(events || []).map(item => ({ ...item, category: "upcoming_events" })),
          ...(research || []).map(item => ({ ...item, category: "research" }))
        ].slice(0, 6);

        setFeaturedAnnouncements(combined);
      } catch (error) {
        console.error("Error fetching featured:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleTabChange = (tab) => {
    navigate(`/home/${tab}`);
  };

  return (
    <Layout handleTabChange={handleTabChange}>
      {/* Hero Section */}
      <HeroSection />

      {/* Features/Categories Grid */}
      <FeaturesSection />

      {/* Featured Announcements */}
      <section style={{
        backgroundColor: "#FFFFFF",
        padding: "4rem 1.5rem",
        borderTop: "1px solid #D4D4D4"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              <h2 style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#2B2B2B",
                marginBottom: "0.25rem"
              }}>
                Latest Announcements
              </h2>
              <p style={{
                fontSize: "0.9375rem",
                color: "#666666"
              }}>
                Recent updates from colleges across India
              </p>
            </div>
            <button
              onClick={() => navigate("/home/news")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.625rem 1rem",
                backgroundColor: "#F8F8F8",
                color: "#2B2B2B",
                border: "1px solid #D4D4D4",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.15s ease"
              }}
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          {isLoading ? (
            <div style={{
              display: "flex",
              justifyContent: "center",
              padding: "3rem"
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
          ) : featuredAnnouncements.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.25rem"
            }}>
              {featuredAnnouncements.map((item, index) => (
                <AnnouncementCard
                  key={item._id?.$oid || index}
                  item={item}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "3rem",
              color: "#666666"
            }}>
              No announcements available
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;