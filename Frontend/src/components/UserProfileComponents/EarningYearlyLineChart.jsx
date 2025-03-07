import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const EarningYearlyLineChart = ({ earnings, selectedYear }) => {
  const [monthlyData, setMonthlyData] = useState({
    earningsData: Array(12).fill(0),
    clickCountData: Array(12).fill(0),
    buyCountData: Array(12).fill(0),
  });

  useEffect(() => {
    // Calculate data whenever earnings or selectedYear changes
    const processData = () => {
      let earningsData = Array(12).fill(0);
      let clickCountData = Array(12).fill(0);
      let buyCountData = Array(12).fill(0);

      earnings.forEach((earning) => {
        earning.monthlyTrackers.forEach((tracker) => {
          const trackerYear = tracker.month.split('-')[0];
          const trackerMonth = parseInt(tracker.month.split('-')[1], 10) - 1;

          // Only consider data for the selected year
          if (trackerYear === selectedYear.toString()) {
            clickCountData[trackerMonth] += tracker.count;
            buyCountData[trackerMonth] += tracker.buyCount;
            earningsData[trackerMonth] += tracker.count * earning.perClickPrice + tracker.buyCount * earning.perBuyPrice;
          }
        });
      });

      setMonthlyData({
        earningsData,
        clickCountData,
        buyCountData,
      });
    };

    processData();
  }, [earnings, selectedYear]);

  // Data for the chart
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Earnings',
        data: monthlyData.earningsData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Click Count',
        data: monthlyData.clickCountData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Buy Count',
        data: monthlyData.buyCountData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="chart-container mt-6">
      <h2 className="text-lg font-semibold dark:text-cyan-100 mb-4">Earnings and Metrics - {selectedYear}</h2>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-lg" style={{ position: 'relative', width: '100%', maxHeight: '400px', height: 'auto' }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              x: {
                ticks: { color: '#cffafe' },
                grid: { color: 'rgba(255,255,255,0.2)' },
              },
              y: {
                ticks: { color: '#cffafe' },
                grid: { color: 'rgba(255,255,255,0.2)' },
              },
            },
            plugins: {
              legend: {
                labels: { color: '#cffafe' },
              },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EarningYearlyLineChart;
