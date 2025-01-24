import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClipboard } from "react-icons/fa"; // Import the clipboard icon

function ProductCard({ product }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Generate Link button click
  const handleGenerateLink = async () => {
    setGeneratedLink(''); // Reset the generated link
    setError(''); // Clear any error message
    setLoading(true); // Start loading

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Authenticate");
      setLoading(false); // Stop loading as we are redirecting
      return;
    }

    try {
      console.log("Request sent for link generation...");
      console.log("Product:", product);

      const response = await axios.post(
        "http://localhost:8080/link/generate",
        { productId: product.productId },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setGeneratedLink(response.data); // Set the generated link
    } catch (err) {
      setError("Failed to generate link. Please try again.");
      console.error("Error generating link:", err);
    } finally {
      setLoading(false); // Stop loading after the request is finished
    }
  };

  // Function to copy the generated link to clipboard
  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 p-6 space-y-4">
      {/* Product details */}
      <h3 className="text-2xl font-semibold text-gray-800 truncate">
          {product.productName}
      </h3>
      <p className="text-sm text-gray-600">Price per click: ${product.perClickPrice}</p>

      {/* Button to generate link */}
      <button
        onClick={handleGenerateLink}
        disabled={loading} // Disable button while loading
        className={`w-full py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
        }`}
      >
        {loading ? "Generating..." : "Generate Link"}
      </button>

      {/* Show the generated link if it exists */}
      {generatedLink && (
        <div className="generated-link space-y-2 mt-4">
          <p className="text-sm text-gray-700">Generated Link:</p>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 truncate max-w-xs">{generatedLink}</span>
            {/* Copy button */}
            <button
              onClick={handleCopyLink}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaClipboard className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Show error message if link generation fails */}
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
}

export default ProductCard;
