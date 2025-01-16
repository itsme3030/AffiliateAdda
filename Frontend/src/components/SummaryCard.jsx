import React, { useState } from 'react';

const SummaryCard = ({ type, title, data, totalAmount }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-8">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>

        {/* Total Amount */}
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            {type === 'earnings' ? 'Earnings' : 'Payable Amount'}: 
          </p>
          <p className="text-3xl font-bold text-green-600">
            ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Toggle Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleDetailsClick}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {/* Table Section */}
        {showDetails && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Product</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Clicks</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Click</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">{item.count}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">${item.perClickPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">
                      ${(item.count * item.perClickPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
