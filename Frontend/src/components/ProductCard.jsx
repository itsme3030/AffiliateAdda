import React, { useState } from 'react';
import axios from "axios";

function ProductCard({ productName }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');

  // Handle Generate Link button click
  const handleGenerateLink = async () => {
    setGeneratedLink('');  // Reset the generated link
    setError('');  // Clear any error message

    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/Authenticate");
    }
    console.log("TodoList : Token : ", token);

    try {
      console.log('Reuest send for link generation...');
      //const response = await generateLink({ productName });
      const response = await axios.get("http://localhost:8080//link/generate",
        { productName },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      setGeneratedLink(response.data);  // Set the generated link
    } catch (err) {
      setError('Failed to generate link');
      console.error('Error generating link:', err);
    }
  };

  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 p-6 space-y-4">
      {/* Product Name */}
      <h3 className="text-2xl font-semibold text-gray-800 truncate">{productName}</h3>

      {/* Button to generate link */}
      <button
        onClick={handleGenerateLink}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Link
      </button>

      {/* Show the generated link if it exists */}
      {generatedLink && (
        <div className="generated-link space-y-2 mt-4">
          <p className="text-sm text-gray-700">Generated Link:</p>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {generatedLink}
          </a>
        </div>
      )}

      {/* Show error message if link generation fails */}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
}

export default ProductCard;
