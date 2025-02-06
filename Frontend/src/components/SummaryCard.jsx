import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaCopy, FaTrash } from 'react-icons/fa';

const SummaryCard = ({ type, title, data, totalAmount }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  // Handle Copy URL
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  // Handle Delete (for now just log)
  const handleDeactivate = (ID) => {
    console.log("Deleted ID: ", ID);
    // can implement further delete functionality as needed
  };

  // Handle Active (for now just log)
  const handleActivate = (ID) => {
    console.log("Activeted ID: ", ID);
    // can implement further Active functionality as needed
  };

  // Determine the color based on the type
  const totalAmountColor = type === "payable" ? "text-red-600" : "text-green-600";

  // Separate data into active and inactive items
  const activeData = data.filter(item => item.active);
  const inactiveData = data.filter(item => !item.active);

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
          <div className="mt-4">
            {/* Active Products */}
            {activeData.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Active Products</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Product</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Clicks</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Click</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Buy Count</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Buy</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Total</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeData.map((item) => (
                        <tr key={type === 'payable' ? item.productId : item.tId} className="border-t">
                          {/* Product Details */}
                          <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">{item.count}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">${item.perClickPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">{item.buyCount}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">${item.perBuyPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">
                            ${((item.count * item.perClickPrice) + (item.buyCount * item.perBuyPrice)).toFixed(2)}
                          </td>
                          {/* URL and Button Actions */}
                          <td className="px-4 py-2 text-gray-700 text-center">
                            <div className="flex items-center justify-between">
                              <div className="text-blue-500 truncate max-w-[200px]" title={type === "payable" ? item.productBaseurl : item.productGeneratedUrl}>
                                {type === "payable" ? (
                                  <a href={item.productBaseurl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {item.productBaseurl}
                                  </a>
                                ) : (
                                  <a href={item.productGeneratedUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {item.productGeneratedUrl}
                                  </a>
                                )}
                              </div>

                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleCopyUrl(type === "payable" ? item.productBaseurl : item.productGeneratedUrl)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <FaCopy />
                                </button>
                                <button 
                                  onClick={() => handleDeactivate(type === 'payable' ? item.productId : item.tId)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Inactive Products */}
            {inactiveData.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Inactive Products</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b">Product</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Clicks</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Click</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Buy Count</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Price per Buy</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Total</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-600 border-b text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inactiveData.map((item) => (
                        <tr key={type === 'payable' ? item.productId : item.tId} className="border-t">
                          {/* Product Details */}
                          <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">{item.count}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">${item.perClickPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">{item.buyCount}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">${item.perBuyPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-gray-700 text-center">
                            ${((item.count * item.perClickPrice) + (item.buyCount * item.perBuyPrice)).toFixed(2)}
                          </td>
                          {/* URL and Button Actions */}
                          <td className="px-4 py-2 text-gray-700 text-center">
                            <div className="flex items-center justify-between">
                              <div className="text-blue-500 truncate max-w-[200px]" title={type === "payable" ? item.productBaseurl : item.productGeneratedUrl}>
                                {type === "payable" ? (
                                  <a href={item.productBaseurl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {item.productBaseurl}
                                  </a>
                                ) : (
                                  <a href={item.productGeneratedUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {item.productGeneratedUrl}
                                  </a>
                                )}
                              </div>

                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleCopyUrl(type === "payable" ? item.productBaseurl : item.productGeneratedUrl)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <FaCopy />
                                </button>
                                <button 
                                  onClick={() => handleActivate(type === 'payable' ? item.productId : item.tId)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <FaCheckCircle />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
