import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SummaryCard from './SummaryCard';
import TransactionHistory from './TransactionHistory';
import { FaSpinner } from 'react-icons/fa'; // Loading spinner
import OverallSummary from './OverallSummary';

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
        <div className="text-lg text-gray-600 flex items-center">
          <FaSpinner className="animate-spin mr-2 text-blue-500" /> Loading...
        </div>
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

  const handleMakePaymentClick = () => {
    //console.log("profileData.payments", profileData);
    navigate("/payments", { state: {
      Allpayments: profileData
    } }); // Pass profileData in the state
    // Not safe - Because we can change it in developer tool.
    // Will find other way...
  };

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
        User Profile
      </h2>
      <h6 className="text-xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
        {profileData.username}
      </h6>

      {/* Overall Summary */}
      <OverallSummary profileData={profileData} />

      <div className="grid grid-cols-1 gap-6">
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

        {/* Transaction History */}
        <TransactionHistory transactions={profileData.payments} title="Transaction Summary"/>
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={handleMakePaymentClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold  hover:bg-blue-800 transition">
          Make Payment
        </button>
      </div>


    </div>
  );
};

export default UserProfile;
