import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productBaseurl, setProductBaseurl] = useState("");
  const [perClickPrice, setPerClickPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // This hook will check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token is found, redirect to the authentication page
      navigate("/Authenticate");
    }
  }, [navigate]); // Run this effect when the component is mounted

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      productBaseurl,
      perClickPrice: parseFloat(perClickPrice),
      productType,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/product/add", productData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Redirect to the list of products or success page
        navigate("/"); // Redirect to the home page or a success page
      }
    } catch (err) {
      setError("Error adding product. Please try again.");
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add a New Product</h2>
      {error && <div className="bg-red-200 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label htmlFor="productBaseurl" className="block text-sm font-medium text-gray-700">
            Product Base URL
          </label>
          <input
            type="text"
            id="productBaseurl"
            value={productBaseurl}
            onChange={(e) => setProductBaseurl(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product base URL"
          />
        </div>

        <div>
          <label htmlFor="perClickPrice" className="block text-sm font-medium text-gray-700">
            Price per Click
          </label>
          <input
            type="number"
            id="perClickPrice"
            value={perClickPrice}
            onChange={(e) => setPerClickPrice(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price per click"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
            Product Type
          </label>
          <input
            type="text"
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product type"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
