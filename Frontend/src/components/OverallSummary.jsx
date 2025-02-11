import React from 'react';

const SummaryCard = ({ profileData }) => {
  //console.log("Profile data : Overall summary : ", profileData)
  if (!profileData) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-300 text-center text-gray-500">
        <p>No profile data available</p>
      </div>
    );
  }

  const {
    totalEarnings = 0,
    totalPayableAmount = 0,
    totalPays = 0,
    totalWithdrawals = 0,
  } = profileData;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Overall Summary</h3>

      <div className="space-y-4">
        {/* Total Earnings & Total Withdrawals side by side */}
        <div className="flex justify-between items-center space-x-4">
          <div className="flex-1">
            <p className="text-gray-600"><strong>Total Earnings:</strong></p>
            <p className="font-semibold text-green-600">${totalEarnings.toFixed(2)}</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-600"><strong>Total Withdrawals:</strong></p>
            <p className="text-green-600">${totalWithdrawals.toFixed(2)}</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-600"><strong>Remaining Earnings:</strong></p>
            <p className="font-semibold text-yellow-600">
              ${(totalEarnings - totalWithdrawals).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Total Payable Amount & Total Pays side by side */}
        <div className="flex justify-between items-center space-x-4">
          <div className="flex-1">
            <p className="text-gray-600"><strong>Total Payable Amount:</strong></p>
            <p className="font-semibold text-red-600">${totalPayableAmount.toFixed(2)}</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-600"><strong>Total Pays:</strong></p>
            <p className="text-red-600">${totalPays.toFixed(2)}</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-600"><strong>Remaining Pays:</strong></p>
            <p className="font-semibold text-purple-600">
              ${(totalPayableAmount - totalPays).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
