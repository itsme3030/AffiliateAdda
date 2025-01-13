import React, { useState } from 'react';

const SummaryCard = ({ type, title, data, totalAmount }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle visibility of details
  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        {/* Total Amount (Earnings or Payable) */}
        <div className="mt-4">
          <p className="text-lg text-gray-600">{type === 'earnings' ? 'Earnings' : 'Payable Amount'}: </p>
          <p className="text-2xl font-bold text-green-500">
            ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Toggle Button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleDetailsClick}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {/* Details Section */}
        {showDetails && (
          <div className="mt-6 space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{item.productName}</span>
                <span>
                  {item.count} clicks x ${item.perClickPrice.toFixed(2)} = ${(
                    item.count * item.perClickPrice
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
