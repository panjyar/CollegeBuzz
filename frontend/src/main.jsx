import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import AnnouncementsPage from './pages/AnnouncementsPage.jsx'
import ArchivedPage from './pages/ArchivedPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Announcements listing by category */}
        <Route path="/home/:tabName" element={<AnnouncementsPage />} />

        {/* Archive routes */}
        <Route path="/archive" element={<ArchivedPage />} />
        <Route path="/archived/:category" element={<ArchivedPage />} />

        {/* About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Static pages */}
        <Route path="/privacy-policy" element={<div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}><h1>Privacy Policy</h1><p>Coming soon...</p></div>} />
        <Route path="/terms" element={<div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}><h1>Terms of Service</h1><p>Coming soon...</p></div>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)