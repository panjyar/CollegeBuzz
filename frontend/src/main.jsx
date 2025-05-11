import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ArchivedPage from './pages/ArchivedPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Define collections array to match the one in HomePage
const collections = [
  "news", "notices", "tenders", 
  "upcoming_events", "recruitments", 
  "admissions", "research"
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider>
        <Routes>
          {/* Redirect root to default home/news */}
          <Route path="/" element={<Navigate to="/home/news" replace />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Home route with tab parameter */}
          <Route path="/home/:tabName" element={<HomePage />} />
          
          {/* Archive routes */}
          <Route path="/archived/:category" element={<ArchivedPage />} />
          
          {/* About page route */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* Additional pages can be added here */}
          <Route path="/privacy-policy" element={<div>Privacy Policy Page (Coming Soon)</div>} />
          <Route path="/terms" element={<div>Terms of Service Page (Coming Soon)</div>} />
          <Route path="/sitemap" element={<div>Sitemap Page (Coming Soon)</div>} />
          
          {/* Catch-all route - redirect to default home */}
          <Route path="*" element={<Navigate to="/home/news" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)