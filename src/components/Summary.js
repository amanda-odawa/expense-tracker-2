import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import "../Styles/Summary.css";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Summary = ({ expenses }) => {
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const highestExpense = expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), { amount: 0 });
  const lowestExpense = expenses.reduce((min, expense) => (expense.amount < min.amount ? expense : min), { amount: Infinity });

  // Format expenses into Year-Month (e.g., "Jan 2024")
  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  // Group expenses by Year-Month
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const key = formatMonthYear(expense.date);
    acc[key] = (acc[key] || 0) + expense.amount;
    return acc;
  }, {});

  // Sort months in chronological order
  const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  // Prepare data for the chart
  const chartData = {
    labels: sortedMonths,
    datasets: [{
      label: "Total Spending",
      data: sortedMonths.map(month => monthlyTotals[month]),
      borderColor: "#ecae72",
      backgroundColor: "#f8d9a2",
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: "#ecae72",
    }]
  };

  return (
    <div className="summary">
      <div className="summary-chart">
        <h4>Monthly Spending Trend</h4>
        <Line data={chartData} />
      </div>
      <h3>Summary</h3>
      <p>Total Spending: Ksh.{totalSpending.toFixed(2)}</p>
      <p>Highest Expense: {highestExpense.title} (Ksh.{highestExpense.amount})</p>
      <p>Lowest Expense: {lowestExpense.title} (Ksh.{lowestExpense.amount})</p>    
    </div>
  );
};

export default Summary;
