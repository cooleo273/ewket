import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components required for the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarCharttwo = () => {
  // Sample data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40], // Data points for each label
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', // Color for January
          'rgba(54, 162, 235, 0.7)', // Color for February
          'rgba(255, 206, 86, 0.7)', // Color for March
          'rgba(75, 192, 192, 0.7)', // Color for April
          'rgba(153, 102, 255, 0.7)', // Color for May
          'rgba(255, 159, 64, 0.7)', // Color for June
          'rgba(255, 99, 132, 0.7)'  // Color for July (repeat for demonstration)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Border color for January
          'rgba(54, 162, 235, 1)', // Border color for February
          'rgba(255, 206, 86, 1)', // Border color for March
          'rgba(75, 192, 192, 1)', // Border color for April
          'rgba(153, 102, 255, 1)', // Border color for May
          'rgba(255, 159, 64, 1)', // Border color for June
          'rgba(255, 99, 132, 1)'  // Border color for July (repeat for demonstration)
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Hide the legend
          },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Sales: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
        ticks: {
          // Define specific y-axis ticks
          callback: function(value) {
            return `${value}`;
          },
          stepSize: 10, // Define the interval between ticks
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div>
      <h4>Expenses</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarCharttwo;
