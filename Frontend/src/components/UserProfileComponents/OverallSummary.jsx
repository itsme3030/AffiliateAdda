import React from 'react';
import { FaDollarSign, FaArrowUp, FaArrowDown, FaBalanceScale, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const SummaryCard = ({ profileData }) => {
  if (!profileData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-cyan-300">
        <p>No profile data available</p>
      </div>
    );
  }

  const { totalEarnings = 0, totalPayableAmount = 0, totalPays = 0, totalWithdrawals = 0 } = profileData;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-cyan-100 mb-4">Overall Summary</h3>

      <div className="space-y-6">
        {/* Total Earnings & Total Withdrawals side by side */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-green-50 dark:hover:bg-green-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaDollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Total Earnings:</strong></p>
                <p className="font-semibold text-green-600 dark:text-green-400">${totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-green-50 dark:hover:bg-green-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaArrowUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Total Withdrawals:</strong></p>
                <p className="font-semibold text-green-600 dark:text-green-400">${totalWithdrawals.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Payable Amount & Total Pays side by side */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaArrowDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Total Payable Amount:</strong></p>
                <p className="font-semibold text-red-600 dark:text-red-400">${totalPayableAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaMoneyBillWave className="h-6 w-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Total Pays:</strong></p>
                <p className="font-semibold text-red-600 dark:text-red-400">${totalPays.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Earnings & Remaining Pays side by side */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaBalanceScale className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Remaining Earnings:</strong></p>
                <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                  ${(totalEarnings - totalWithdrawals).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
            <div className="flex items-center space-x-4">
              <FaCheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-gray-600 dark:text-cyan-300"><strong>Remaining Pays:</strong></p>
                <p className="font-semibold text-purple-600 dark:text-purple-400">
                  ${(totalPayableAmount - totalPays).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
