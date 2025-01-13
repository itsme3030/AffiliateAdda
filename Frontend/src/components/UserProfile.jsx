import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SummaryCard from './SummaryCard';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (!token) {
      navigate("/Authenticate"); // If no token, redirect to Authenticate page
      return; // Return to prevent further rendering
    }

    // Fetch user profile data from backend using Axios
    axios
      .get(`http://localhost:8080/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      })
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching profile data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>

      {/* Earnings Card */}
      <SummaryCard
        type="earnings"
        title="Earnings Summary"
        data={profileData.earnings}
        totalAmount={profileData.totalEarnings}
      />

      {/* Payable Amount Card */}
      <SummaryCard
        type="payable"
        title="Payable Amount Summary"
        data={profileData.payableAmounts}
        totalAmount={profileData.totalPayableAmount}
      />
    </div>
  );
};

export default UserProfile;
