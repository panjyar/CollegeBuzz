// src/pages/AboutPage.jsx
import React from 'react';
import Layout from '../components/Layout/Layout.jsx';
import { Link } from 'react-router-dom';
import {
  Target, Users, Globe, Shield,
  Newspaper, Calendar, FileText, GraduationCap,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Newspaper,
    title: "College News",
    description: "Stay informed with the latest announcements and updates from institutions across India."
  },
  {
    icon: Calendar,
    title: "Events & Workshops",
    description: "Discover upcoming conferences, seminars, and academic events."
  },
  {
    icon: FileText,
    title: "Tenders & Notices",
    description: "Access procurement notices and official tenders from colleges."
  },
  {
    icon: GraduationCap,
    title: "Research Updates",
    description: "Explore academic achievements and research publications."
  }
];

const values = [
  {
    icon: Target,
    title: "Accessibility",
    description: "Making college information easily accessible to everyone, everywhere."
  },
  {
    icon: Users,
    title: "Community",
    description: "Built for students, educators, and administrators across India."
  },
  {
    icon: Globe,
    title: "Transparency",
    description: "Aggregating publicly available data from official sources."
  },
  {
    icon: Shield,
    title: "Independence",
    description: "An independent platform, not affiliated with any government body."
  }
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        backgroundColor: "#FFFFFF",
        padding: "5rem 1.5rem",
        borderBottom: "1px solid #D4D4D4"
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#F8F8F8",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            color: "#666666",
            marginBottom: "1.5rem",
            border: "1px solid #D4D4D4"
          }}>
            About CollegeBuzz
          </div>

          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#2B2B2B",
            lineHeight: "1.2",
            marginBottom: "1.25rem"
          }}>
            One Platform for All
            <br />College Updates
          </h1>

          <p style={{
            fontSize: "1.125rem",
            color: "#666666",
            lineHeight: "1.7"
          }}>
            CollegeBuzz aggregates news, events, tenders, and research updates from
            AICTE-approved colleges across India. Our mission is to make college
            information accessible to everyone.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: "#F8F8F8",
        padding: "4rem 1.5rem"
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#2B2B2B",
            textAlign: "center",
            marginBottom: "2.5rem"
          }}>
            What We Offer
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem"
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px solid #D4D4D4"
              }}>
                <feature.icon size={28} style={{ color: "#2B2B2B", marginBottom: "1rem" }} />
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#2B2B2B",
                  marginBottom: "0.5rem"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  color: "#666666",
                  lineHeight: "1.5",
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        backgroundColor: "#FFFFFF",
        padding: "4rem 1.5rem"
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#2B2B2B",
            textAlign: "center",
            marginBottom: "2.5rem"
          }}>
            Our Values
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem"
          }}>
            {values.map((value, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#F8F8F8",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}>
                  <value.icon size={24} style={{ color: "#2B2B2B" }} />
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#2B2B2B",
                  marginBottom: "0.5rem"
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  color: "#666666",
                  lineHeight: "1.5",
                  margin: 0
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section style={{
        backgroundColor: "#F8F8F8",
        padding: "3rem 1.5rem"
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <div style={{
            backgroundColor: "#FFFFFF",
            padding: "2rem",
            borderRadius: "12px",
            border: "1px solid #D4D4D4"
          }}>
            <Shield size={32} style={{ color: "#B3B3B3", marginBottom: "1rem" }} />
            <h3 style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#2B2B2B",
              marginBottom: "0.75rem"
            }}>
              Important Disclaimer
            </h3>
            <p style={{
              fontSize: "0.9375rem",
              color: "#666666",
              lineHeight: "1.6",
              margin: 0
            }}>
              CollegeBuzz is an independent platform and is <strong>not affiliated with AICTE,
                any government body, or any educational institution</strong>. We aggregate publicly
              available information for informational purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: "#2B2B2B",
        padding: "4rem 1.5rem"
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#FFFFFF",
            marginBottom: "1rem"
          }}>
            Start Exploring
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "#B3B3B3",
            marginBottom: "1.5rem"
          }}>
            Browse announcements from hundreds of AICTE-approved colleges
          </p>
          <Link
            to="/home/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              backgroundColor: "#FFFFFF",
              color: "#2B2B2B",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              textDecoration: "none"
            }}
          >
            Browse Announcements
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;