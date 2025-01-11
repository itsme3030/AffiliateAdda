import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProductCard from './ProductCard';
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch product list from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await axios.get("http://localhost:8080/product/list");

        console.log('Fetching the list of productName');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Error message */}
      {error && (
        <div className="mb-4 text-center text-white bg-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} productName={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
