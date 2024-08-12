import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';


// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement
);

const Charts = () => {
  const theme = useTheme();

  // Sample data for line chart (Student Attendance)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Student Attendance',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    ],
  };

  // Sample data for bar chart (Class Performance)
  const barChartData = {
    labels: ['Class A', 'Class B', 'Class C', 'Class D'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81],
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  // Sample data for radar chart (Student Performance by Subject)
  const radarChartData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art', 'Physical Education'],
    datasets: [
      {
        label: 'Student Performance',
        data: [75, 90, 85, 70, 65, 80],
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: theme.palette.primary.main,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme.palette.primary.main,
      },
    ],
  };

  // Sample data for working hours


  
  return (
    <Box sx={{ padding: '20px' }}>
      
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>

      <Grid container spacing={3}>
       

        {/* Student Attendance Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Student Attendance</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <Line data={lineChartData} />
            </Box>
          </Paper>
        </Grid>

        {/* Class Performance Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Class Performance</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <Bar data={barChartData} />
            </Box>
          </Paper>
        </Grid>

        {/* Student Performance by Subject Radar Chart */}
        <Grid item xs={12}>
          <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">Student Performance by Subject</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <Radar data={radarChartData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;
