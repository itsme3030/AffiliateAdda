import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

function ProductList({ searchTerm, selectedType }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch product list from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/product/list");
        console.log('Fetching the list of products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and selected type
  const filteredProducts = products.filter((product) => {
    const matchesType = selectedType ? product.productType === selectedType : true;
    const matchesSearch = searchTerm
      ? product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
            />
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
