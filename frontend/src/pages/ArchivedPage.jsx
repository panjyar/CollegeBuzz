import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import ArchivedDataView from '../components/common/ArchivedDataView .jsx';
import { categories } from '../utils/fieldMappings.js';

const ArchivedPage = () => {
  const { category } = useParams();
  
  // Validate if the category is valid
  const isValidCategory = categories.includes(category);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#2563eb",
              marginBottom: "1rem"
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {isValidCategory ? (
          <ArchivedDataView category={category} />
        ) : (
          <div className="error-container text-center py-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Category</h2>
            <p className="mb-6">The requested category does not exist.</p>
            <Link 
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ArchivedPage;