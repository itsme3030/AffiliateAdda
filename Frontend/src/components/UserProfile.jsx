import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SummaryCard from './SummaryCard';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Authenticate");
      return;
    }

    axios
      .get(`http://localhost:8080/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">User Profile</h2>

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
