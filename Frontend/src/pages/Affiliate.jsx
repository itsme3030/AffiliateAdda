import React, { useState } from "react";
import ProductList from "../components/ProductList";

function Affiliate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Handle category button click
  const handleCategoryClick = (type) => {
    if (type === 'All Products') {
      setSelectedType(''); // If "All Products" is clicked, reset the type to show all products
    } else {
      setSelectedType(type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Category buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All Products', 'Product - Amazon', 'Product - Flipkart', 'YouTube Video', 'Landing Page', 'Website'].map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selectedType === category || (selectedType === '' && category === 'All Products')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
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
}

export default Affiliate