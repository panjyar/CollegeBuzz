import React, { useState, useEffect } from "react";
import { ArrowRight, Search, Filter, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import hero background images
import heroBg1 from "../../assets/hero_bg_1_1768664064394.png";
import heroBg2 from "../../assets/hero_bg_2_1768664092480.png";
import heroBg3 from "../../assets/hero_bg_3_1768664110513.png";
import heroBg4 from "../../assets/hero_bg_4_1768664129752.png";

const heroImages = [heroBg1, heroBg2, heroBg3, heroBg4];

const categories = [
  { id: "news", label: "News" },
  { id: "upcoming_events", label: "Events" },
  { id: "tenders", label: "Tenders" },
  { id: "research", label: "Research" },
  { id: "admissions", label: "Admissions" },
  { id: "recruitments", label: "Recruitments" },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("news");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to announcements page with search query
    navigate(`/home/${selectedCategory}?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setIsFilterOpen(false);
  };

  return (
    <section style={{
      position: "relative",
      minHeight: "600px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Background Images with Crossfade */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "900px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
        textAlign: "center"
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          fontSize: "0.875rem",
          color: "#FFFFFF",
          marginBottom: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <span style={{ fontSize: "1rem" }}>🎓</span>
          AICTE College Updates Platform
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "800",
          color: "#FFFFFF",
          lineHeight: "1.1",
          marginBottom: "1.5rem",
          letterSpacing: "-0.025em",
          textShadow: "0 2px 10px rgba(0,0,0,0.3)"
        }}>
          All College Updates.
          <br />
          <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>One Platform.</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: "1.25rem",
          color: "rgba(255, 255, 255, 0.85)",
          lineHeight: "1.6",
          maxWidth: "600px",
          margin: "0 auto 2rem"
        }}>
          News, events, tenders, and research updates from 500+ AICTE-approved
          colleges across India — aggregated and organized for you.
        </p>

        {/* Search Box with Filter */}
        <form onSubmit={handleSearch} style={{
          display: "flex",
          gap: "0.5rem",
          maxWidth: "600px",
          margin: "0 auto 2rem",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {/* Category Filter Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1rem",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#2B2B2B",
                cursor: "pointer",
                minWidth: "130px",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Filter size={16} />
                {categories.find(c => c.id === selectedCategory)?.label}
              </div>
              <ChevronDown size={16} style={{
                transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s"
              }} />
            </button>

            {isFilterOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                minWidth: "160px",
                zIndex: 10,
                overflow: "hidden"
              }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      border: "none",
                      backgroundColor: selectedCategory === cat.id ? "#F0F0F0" : "transparent",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: selectedCategory === cat.id ? "600" : "400",
                      color: "#2B2B2B"
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div style={{
            flex: 1,
            minWidth: "250px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 1rem",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px"
          }}>
            <Search size={18} style={{ color: "#666" }} />
            <input
              type="text"
              placeholder="Search announcements, colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "0.9rem",
                backgroundColor: "transparent",
                color: "#2B2B2B"
              }}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              backgroundColor: "#2B2B2B",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.15s"
            }}
          >
            Search
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Links */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "2rem"
        }}>
          {categories.slice(0, 4).map(cat => (
            <Link
              key={cat.id}
              to={`/home/${cat.id}`}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontSize: "0.8rem",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "background-color 0.15s"
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          flexWrap: "wrap"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>500+</div>
            <div style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.7)"
            }}>Colleges Indexed</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>10K+</div>
            <div style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.7)"
            }}>Active Announcements</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}>Daily</div>
            <div style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.7)"
            }}>Updates</div>
          </div>
        </div>

        {/* Image Indicators */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "2rem"
        }}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: index === currentImageIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: index === currentImageIndex
                  ? "#FFFFFF"
                  : "rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;