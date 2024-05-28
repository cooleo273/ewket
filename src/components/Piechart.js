import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/users/row-count');
      const { student, teacher, admin} = response.data;

      // Process API data to match chart data format
      const labels = ['Students', 'Teachers', 'Admins'];
      const data = [student, teacher, admin];
      const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ];
      const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ];

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'users',
              data: data,
              backgroundColor: backgroundColor,
            borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <div style={{ width: '400px', height: '400px' }}><Pie data={chartData} /></div>;
};

export default PieChart;