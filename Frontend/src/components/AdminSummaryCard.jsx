const AdminSummaryCard = ({ type, title, data, totalAmount }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-cyan-100 mb-4">{title}</h3>
      <div className="text-3xl font-bold text-gray-800 dark:text-cyan-100">
        {data ? (
          <span className="text-yellow-800 dark:text-yellow-500">{data}</span>
        ) : (
          <span className={
            type === 'earnings' ? 'text-blue-600 dark:text-cyan-500' :
            type === 'payable' ? 'text-blue-600 dark:text-cyan-500' :
            type === 'website' ? 'text-green-800 dark:text-green-600' :
            'text-gray-800 dark:text-cyan-100'
          }>
            {totalAmount ? totalAmount.toFixed(2) : "N/A"}$
          </span>
        )}
      </div>
      {type === "earnings" && (
        <p className="text-sm text-gray-500 dark:text-cyan-300 mt-2">Total Earnings for All Users</p>
      )}
      {type === "payable" && (
        <p className="text-sm text-gray-500 dark:text-cyan-300 mt-2">Total Payable Amount for All Users</p>
      )}
      {type === "users" && (
        <p className="text-sm text-gray-500 dark:text-cyan-300 mt-2">Total Number of Users in the Platform</p>
      )}
      {type === "website" && (
        <p className="text-sm text-gray-500 dark:text-cyan-300 mt-2">Total Earnings from 50% commission</p>
      )}
    </div>
  );
};

export default AdminSummaryCard;
