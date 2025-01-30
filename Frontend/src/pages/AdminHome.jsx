import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSummaryCard from '../components/AdminSummaryCard';
import { FaSpinner } from 'react-icons/fa'; // Loading spinner

const AdminHome = () => {
  const [adminData, setAdminData] = useState(null);
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
      .get(`http://localhost:8080/admin/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdminData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching admin data');
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

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users Card */}
        <AdminSummaryCard
          type="users"
          title="Total Users"
          data={adminData.totalUsers}
        />

        {/* Total Earnings Card */}
        <AdminSummaryCard
          type="earnings"
          title="Total Earnings"
          totalAmount={adminData.totalEarnings}
        />

        {/* Total Payable Amount Card */}
        <AdminSummaryCard
          type="payable"
          title="Total Payable Amount"
          totalAmount={adminData.totalPayableAmount}
        />
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Users Overview
      </h3>

      {/* Users List Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Total Earnings</th>
              <th className="py-3 px-6 text-left">Total Payable Amount</th>
            </tr>
          </thead>
          <tbody>
            {adminData.users.map((user) => (
              <tr key={user.username} className="border-t border-gray-200">
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.totalEarnings.toFixed(2)}</td>
                <td className="py-3 px-6">{user.totalPayableAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
