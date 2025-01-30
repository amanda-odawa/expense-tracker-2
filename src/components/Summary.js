// src/components/Summary.js
const Summary = ({ expenses }) => {
    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const highestExpense = expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), { amount: 0 });
    const lowestExpense = expenses.reduce((min, expense) => (expense.amount < min.amount ? expense : min), { amount: Infinity });
  
    return (
      <div className="summary">
        <h2>Summary</h2>
        <p>Total Spending: ${totalSpending.toFixed(2)}</p>
        <p>Highest Expense: {highestExpense.title} (${highestExpense.amount})</p>
        <p>Lowest Expense: {lowestExpense.title} (${lowestExpense.amount})</p>
      </div>
    );
  };
  
  export default Summary;