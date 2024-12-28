import React from "react";
import ProductList from "../components/Products/ProductList";

const Home = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
      Product List
    </h1>
    <ProductList />
  </div>
);

export default Home;
