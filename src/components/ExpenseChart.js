import { Pie } from 'react-chartjs-2';
import { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Summary from "./Summary";
import "../Styles/ExpenseChart.css";

// Register necessary Chart.js components and plugin
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

const ExpenseChart = ({ expenses = [] }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  });

  // Function to process data for the chart (memoized)
  const processChartData = useCallback(() => {
    if (expenses.length === 0) return;

    // Grouping expenses by category and summing amounts
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);
    const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);

    // Color palette (Dynamically assign colors)
    const colors = ['#F5CB5C', '#8ab0ab', '#E3D0BE', '#E39088', '#D0AEB3', '#ECAE72', '#COBE84'];

    setChartData({
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        datalabels: {
          color: '#fff',
          formatter: (value) => `${((value / totalAmount) * 100).toFixed(1)}%`, // Show percentage
          font: { weight: 'bold' }
        }
      }]
    });
  }, [expenses]);

  useEffect(() => {
    processChartData();
  }, [processChartData]); 

  return (
    <div className="expense-container">
      <div className="expense-chart">
        <h2>Expense Overview</h2>
        <Pie 
          // Chart data coming from state
          data={chartData}
          options={{
            plugins: {
              legend: { position: 'bottom' },
              datalabels: {
                color: 'black',
                font: { size: 14, weight: 'bold' },
                // Function to format the labels to show percentages
                formatter: (value, context) => {
                  const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                  return `${((value / total) * 100).toFixed(1)}%`;
                }
              }
            }
          }}
        />
      </div>
      <Summary expenses={expenses} />
    </div>
  );
};

export default ExpenseChart;
