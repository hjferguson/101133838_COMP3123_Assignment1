import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './Dashboard.css';


Chart.register(ArcElement);


function UserDashboard() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v2/employees/statistics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatistics(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('oopsie daisy')
      }
    };

    fetchData();
  }, []); // The empty array ensures this effect runs only once after initial render

  // Check if statistics is loaded
  if (!statistics) {
    return <div>Loading...</div>; 
  }

  // Data for the Pie chart
  const genderChartData = {
    labels: statistics.genderDistribution.map(g => g._id),
    datasets: [{
      label: 'Gender Distribution',
      data: statistics.genderDistribution.map(g => g.count),
      backgroundColor: ['#1E90FF', 'red', 'green']
     
    }]
  };

  return (
    <div className="dashboard-container">
      <p className="statistic">Total Employees: {statistics.totalEmployees}</p>
      <div className="chart-container">
        <Pie data={genderChartData} />
      </div>
      <p className="statistic">Average Employee Salary: ${statistics.averageSalary}</p>
    </div>
  );
}

export default UserDashboard;
