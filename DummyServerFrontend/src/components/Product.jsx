import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Product() {
  const [productCount, setProductCount] = useState(1);
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const location = useLocation();

  // Decode the URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get('data');
    console.log("data : ",data);
  
    if (data) {
      // Decode the Base64 encoded 'data'
      const decodedData = atob(data);
      
      // Split by ':' to get userId and productId
      const paramsArray = decodedData.split(':');
      const userIdParam = paramsArray[0]; 
      const productIdParam = paramsArray[1];
  
      // Set the extracted values into state
      setUserId(userIdParam);
      setProductId(productIdParam);
    }
  }, [location]);

  // Handle the "Buy" button click
  const handleBuy = async () => {
    try {
      // Prepare the data to send to Paypergo backend
      const dataToSend = `userId=${userId}&productId=${productId}&buyCount=${productCount}`;
      console.log("dataToSend : ",dataToSend);
      const encodedData = btoa(dataToSend); // Base64 encode the data

      // Send the data to the Paypergo backend to update the buy count
      const response = await axios.post(`http://localhost:8080/link/track-buy?data=${encodedData}`);

      if (response.status === 200) {
        alert('Buy count updated successfully');
      } else {
        alert('Failed to update buy count');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('An error occurred during the purchase.');
    }
  };

  return (
    <div>
      <h1>Product Purchase</h1>
      <p>Product ID: {productId}</p>
      <p>User ID: {userId}</p>

      <label htmlFor="productCount">Number of Items: </label>
      <input
        type="number"
        id="productCount"
        value={productCount}
        onChange={(e) => setProductCount(Number(e.target.value))}
        min="1"
      />

      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}

export default Product;
