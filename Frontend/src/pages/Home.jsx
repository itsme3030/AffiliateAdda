import React, { useState } from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Handle category button click
  const handleCategoryClick = (type) => setSelectedType(type);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Category buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => handleCategoryClick('Product - Amazon')}
        >
          Amazon Products
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => handleCategoryClick('Product - Flipkart')}
        >
          Flipkart Products
        </button>
        <button
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          onClick={() => handleCategoryClick('YouTube Video')}
        >
          YouTube Videos
        </button>
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          onClick={() => handleCategoryClick('Landing Page')}
        >
          Landing Pages
        </button>
      </div>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="p-3 w-1/2 sm:w-1/3 md:w-1/4 border border-gray-300 rounded-lg"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            // Implement search functionality here
            console.log(`Searching for: ${searchTerm}`);
          }}
        >
          Search
        </button>
      </div>

      {/* Product List */}
      <ProductList searchTerm={searchTerm} selectedType={selectedType} />
    </div>
  );
};

export default Home;
