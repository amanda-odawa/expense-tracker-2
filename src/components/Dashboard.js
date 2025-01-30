// src/components/Dashboard.js
import ExpenseChart from "./ExpenseChart";
import Summary from "./Summary";
import "../Styles/Dashboard.css";

const Dashboard = ({ expenses }) => {
  return (
    <div className="dashboard-container">
      <h1>Expense Overview</h1>
      <div className="dashboard-content">
        <ExpenseChart expenses={expenses} />
        <Summary expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;