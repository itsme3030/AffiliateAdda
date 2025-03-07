import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { Allpayments } = location.state || {}; // Extract payments from the state

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

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_API}/transactions/pay`,
          { amount: parseFloat(amount) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Get orderId from response
        const orderId = response.data;

        // Razorpay payment initialization
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY || "",
          amount: parseFloat(amount) * 100, // Convert to paise
          currency: "INR",
          name: "AffiliateAdda",
          description: "Test Transaction",
          order_id: orderId,
          handler: function (response) {
            // Send the payment details to backend for verification
            axios.post(
              `${import.meta.env.VITE_API}/transactions/updatePay`,
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ).then((result) => {
              setSuccessMessage("Payment Successful");
              setAmount("");
              navigate("/user-profile");
            }).catch((err) => {
              setError("Payment verification failed.");
            });
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
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
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_API}/transactions/withdraw`,
          { amount: parseFloat(amount) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(response.data);
        setAmount("");
        navigate("/user-profile");
      } catch (err) {
        setError(err.response?.data || "An error occurred while processing withdrawal.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-cyan-100 mb-4">Payments</h3>
        <div className="space-y-4">
          {/* Remaining Pays & Remaining Earnings side by side */}
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1">
              <p className="text-gray-600 dark:text-cyan-300"><strong>You can Withdraw up to:</strong></p>
              <p className="font-semibold text-green-600 dark:text-green-400">
                ${(availableWithdrawal).toFixed(2)}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-cyan-300"><strong>You have to Pay:</strong></p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                ${(remainingPayableAmount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amount Input Field */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 dark:text-cyan-100 text-lg mb-2">Enter Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-cyan-100 transition-colors duration-500"
            placeholder="Enter amount to pay or withdraw"
          />
        </div>

        {/* Error or Success Message */}
        {error && <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 dark:text-green-400 mb-4">{successMessage}</div>}

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handlePay}
            className="w-full bg-blue-600 dark:bg-cyan-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 dark:hover:bg-cyan-800 transition-colors duration-500"
          >
            Pay
          </button>
          <button
            onClick={handleWithdrawal}
            className="w-full bg-green-600 dark:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-800 dark:hover:bg-green-800 transition-colors duration-500"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
