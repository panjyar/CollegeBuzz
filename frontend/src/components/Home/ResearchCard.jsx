import React from "react";
import { BookOpen } from "lucide-react";
import { fieldMappings } from "../../utils/fieldMappings.js";
import { getCollegeName } from "../../utils/collegeMapper.js";
import { motion } from "framer-motion"; // animation library

const ResearchCard = ({ paper }) => {
  const collegeName = getCollegeName(paper[fieldMappings.research.link]);

  return (
    <motion.div
      className="research-paper-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      style={{
        backgroundColor: "white",
        padding: "1.75rem",
        borderRadius: "1rem",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "start", gap: "0.75rem", marginBottom: "1rem" }}>
        <BookOpen size={24} style={{ color: "#2563eb", flexShrink: 0, marginTop: "0.25rem" }} />
        <h3 style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          lineHeight: "1.4",
          color: "#111827",
          margin: 0
        }}>
          {paper[fieldMappings.research.title]}
        </h3>
      </div>
      <p style={{
        fontSize: "0.95rem",
        color: "#6b7280",
        marginBottom: "1.25rem",
        lineHeight: "1.5"
      }}>
        Published by: {collegeName}
      </p>
      <a
        href={paper[fieldMappings.research.link]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#2563eb",
          fontWeight: "600",
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        Read more →
      </a>
    </motion.div>
  );
};

export default ResearchCard;
