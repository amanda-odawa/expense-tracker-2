// src/components/ExpenseChart.js
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import "../Styles/ExpenseChart.css";

// Registering necessary chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ExpenseChart = ({ expenses = [] }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });

  // Function to process data for the chart
  const processChartData = () => {
    // Grouping expenses by category and summing amounts
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);

    // Color palette (Dynamically assign colors)
    const colors = ['#F5CB5C', '#8ab0ab', '#E3D0BE', '#E39088', '#D0AEB3', '#ECAE72', '#COBE84'];
    const backgroundColors = categories.map((_, i) => colors[i % colors.length]); 

    setChartData({
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: backgroundColors
      }]
    });
  };

  useEffect(() => {
    if (expenses.length > 0) {
      processChartData();
    }
  }, [expenses]);
  
  return (
    <div className="expense-chart">
      <h2 className="expense-chart-title">Expense Overview</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseChart;