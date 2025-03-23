import React from "react";

const NewsletterSubscribe = () => {
  return (
    <div>
      <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.75rem" }}>Subscribe to Newsletter</h4>
      <div style={{ display: "flex" }}>
        <input 
          type="email" 
          placeholder="Your email" 
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem 0 0 0.25rem",
            border: "none",
            backgroundColor: "white",
            flex: "1",
            fontSize: "0.9rem"
          }}
        />
        <button style={{
          backgroundColor: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0 0.25rem 0.25rem 0",
          cursor: "pointer",
          fontWeight: "500"
        }}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;