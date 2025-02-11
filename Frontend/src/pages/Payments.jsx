import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Payments() {
  const location = useLocation();
  const { Allpayments } = location.state || {}; // Extract payments from the state

  //console.log("Payments : ",Allpayments);
  
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);


  if (!Allpayments) {
    return <div>No payments data available</div>;
  }

  const {
    totalEarnings = 0,
    totalPayableAmount = 0,
    totalPays = 0,
    totalWithdrawals = 0,
  } = Allpayments;

  const availableWithdrawal = totalEarnings - totalWithdrawals;
  const remainingPayableAmount = totalPayableAmount - totalPays;

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePay = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0.");
    } else if (parseFloat(amount) > remainingPayableAmount) {
      setError(`You can only pay up to $${remainingPayableAmount.toFixed(2)}.`);
    } else {
      setError("");
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.post(
          'http://localhost:8080/transactions/pay',
          { amount: parseFloat(amount) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(response.data); // "Payment Successful"
        setAmount("");
      } catch (err) {
        setError(err.response?.data || "An error occurred while processing payment.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0.");
    } else if (parseFloat(amount) > availableWithdrawal) {
      setError(`You can only withdraw up to $${availableWithdrawal.toFixed(2)}.`);
    } else {
      setError("");
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.post(
          'http://localhost:8080/transactions/withdraw',
          { amount: parseFloat(amount) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(response.data); // "Withdrawal Successful"
        setAmount("");
      } catch (err) {
        setError(err.response?.data || "An error occurred while processing withdrawal.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12">
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payments</h3>
        <div className="space-y-4">
          {/* Remaining Pays & Remaining Earnings side by side */}
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1">
              <p className="text-gray-600"><strong>You can Withdraw up to:</strong></p>
              <p className="font-semibold text-green-600">
                ${(availableWithdrawal).toFixed(2)}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600"><strong>You have to Pay:</strong></p>
              <p className="font-semibold text-red-600">
                ${(remainingPayableAmount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amount Input Field */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 text-lg mb-2">Enter Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter amount to pay or withdraw"
          />
        </div>

        {/* Error or Success Message */}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handlePay}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
          >
            Pay
          </button>
          <button
            onClick={handleWithdrawal}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
