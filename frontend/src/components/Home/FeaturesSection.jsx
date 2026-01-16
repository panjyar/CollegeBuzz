import React from "react";
import { Newspaper, Calendar, GraduationCap, FileText, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
    {
        icon: Newspaper,
        title: "College News",
        description: "Latest announcements and updates from institutions",
        path: "/home/news",
        color: "#2563eb"
    },
    {
        icon: Calendar,
        title: "Events",
        description: "Conferences, seminars, and workshops",
        path: "/home/upcoming_events",
        color: "#7c3aed"
    },
    {
        icon: FileText,
        title: "Tenders",
        description: "Procurement and contract notices",
        path: "/home/tenders",
        color: "#dc2626"
    },
    {
        icon: GraduationCap,
        title: "Research",
        description: "Publications and academic achievements",
        path: "/home/research",
        color: "#059669"
    },
    {
        icon: Building2,
        title: "Admissions",
        description: "Enrollment updates and deadlines",
        path: "/home/admissions",
        color: "#d97706"
    },
    {
        icon: Users,
        title: "Recruitments",
        description: "Job openings and career opportunities",
        path: "/home/recruitments",
        color: "#0891b2"
    }
];

const FeatureCard = ({ icon: Icon, title, description, path, color }) => {
    return (
        <Link
            to={path}
            style={{
                display: "block",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid #D4D4D4",
                textDecoration: "none",
                transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#D4D4D4";
            }}
        >
            <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: `${color}15`,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
            }}>
                <Icon size={24} style={{ color: color }} />
            </div>
            <h3 style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#2B2B2B",
                marginBottom: "0.5rem"
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: "0.875rem",
                color: "#666666",
                margin: 0,
                lineHeight: "1.5"
            }}>
                {description}
            </p>
        </Link>
    );
};

const FeaturesSection = () => {
    return (
        <section style={{
            backgroundColor: "#F8F8F8",
            padding: "4rem 1.5rem"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                <div style={{
                    textAlign: "center",
                    marginBottom: "3rem"
                }}>
                    <h2 style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#2B2B2B",
                        marginBottom: "0.75rem"
                    }}>
                        Browse by Category
                    </h2>
                    <p style={{
                        fontSize: "1rem",
                        color: "#666666",
                        maxWidth: "500px",
                        margin: "0 auto"
                    }}>
                        Find exactly what you're looking for across different types of announcements
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem"
                }}>
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
