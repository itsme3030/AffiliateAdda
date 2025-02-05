import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'; // Toggle icons

const SummaryCard = ({ type, title, data, totalAmount }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  // Determine the color based on the type
  const totalAmountColor = type === "payable" ? "text-red-600" : "text-green-600";

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <div className={`text-xl font-semibold ${totalAmountColor}`}>
          ${totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="space-y-4">
        {/* Show Details Toggle Button */}
        <button
          onClick={handleDetailsClick}
          className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition duration-300"
        >
          {showDetails ? (
            <>
              <FaArrowUp className="mr-2" />
              Hide Details
            </>
          ) : (
            <>
              <FaArrowDown className="mr-2" />
              Show Details
            </>
          )}
        </button>

        {/* Table Section */}
        {showDetails && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Product</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Clicks</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Click</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Buy Count</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Buy</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={type === 'payable' ? item.productId : item.tId} className="border-t">
                    <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">{item.count}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">${item.perClickPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">{item.buyCount}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">${item.perBuyPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-700 text-center">
                      ${((item.count * item.perClickPrice) + (item.buyCount * item.perBuyPrice)).toFixed(2)}
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
