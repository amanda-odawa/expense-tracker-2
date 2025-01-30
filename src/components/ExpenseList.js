// src/components/ExpenseList.js
import { useState, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import "../Styles/ExpenseList.css";

const ExpenseList = ({ expenses = [], setExpenses }) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    setFilteredExpenses(expenses || []); 
  }, [expenses]);

  const deleteExpense = (id) => {
    fetch(`http://localhost:3001/expenses/${id}`, { method: "DELETE"})
      .then(() => {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      });
  };

  const handleFilter = (filters) => {
    let filtered = [...expenses];
  
    if (filters.category) {
      filtered = filtered.filter((exp) => exp.category === filters.category);
    }
    if (filters.startDate) {
      filtered = filtered.filter((exp) => new Date(exp.date).getTime() >= new Date(filters.startDate).getTime());
    }
    if (filters.endDate) {
      filtered = filtered.filter((exp) => new Date(exp.date).getTime() <= new Date(filters.endDate).getTime());
    }    
  
    setFilteredExpenses(filtered);
  };  

  return (
    <div>
      <h2>Expense List</h2>
      <FilterPanel onFilter={handleFilter} />
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {filteredExpenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} - ${expense.amount} ({expense.category}) on {expense.date}
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;