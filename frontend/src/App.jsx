import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; // Import the CSS file

const categories = ["admissions", "news", "recruitments", "research", "upcoming_events", "notices", "tenders"];

const fieldMappings = {
  admissions: { title: "admission", link: "admission_url" },
  news: { title: "news", link: "news_url" },
  recruitments: { title: "recruitment_title", link: "recruitment_url" },
  research: { title: "research", link: "research_url" },
  upcoming_events: { title: "upcoming_Event_title", link: "upcoming_Event_url", date: "upcoming_Event_date", year: "upcoming_Event_year" },
  notices: { title: "notice_title", link: "notice_url" },
  tenders: { title: "tender_title", link: "tender_url" },
};

const collegeMapping = {
  "www.cit.ac.in": "CIT Kokrajhar",
  "www.nita.ac.in": "NIT Agartala",
  "www.iitb.ac.in": "IIT Bombay",
  "www.iitg.ac.in": "IIT Guwahati",
  "www.iitm.ac.in": "IIT Madras",
  "www.iitkgp.ac.in": "IIT Kharagpur",
  "www.nitt.edu": "NIT Trichy",
  "vit.ac.in": "VIT",
};

const getCollegeName = (url) => {
  if (!url) return "Unknown";
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // Check for exact match
    if (collegeMapping[hostname]) return collegeMapping[hostname];

    // Check for partial match
    for (const [urlPart, name] of Object.entries(collegeMapping)) {
      if (hostname.includes(urlPart)) return name;
    }

    return hostname;
  } catch (error) {
    return "Unknown";
  }
};

const App = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("admissions");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app-container">
      <h1 className="heading">AICTE News & Events</h1>

      <div className="tabs-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${activeTab === category ? "active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="content-box">
        {data[activeTab] && data[activeTab].length > 0 ? (
          <ul className="content-list">
            {data[activeTab].map((item, index) => {
              const collegeName = getCollegeName(item[fieldMappings[activeTab].link]);

              return (
                <li key={index} className="content-item">
                  <a href={item[fieldMappings[activeTab].link]} target="_blank" rel="noopener noreferrer" className="content-link">
                    {item[fieldMappings[activeTab].title]}
                  </a>
                  {fieldMappings[activeTab].date && item[fieldMappings[activeTab].date] && (
                    <p className="content-date">Date: {item[fieldMappings[activeTab].date]}</p>
                  )}
                  <p className="college-name">College: {collegeName}</p> {/* College Name Styling Applied */}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-data">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
