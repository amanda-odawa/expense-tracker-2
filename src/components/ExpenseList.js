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
    fetch(`http://localhost:3001/expenses/${id}`, { method: "DELETE" })
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
      filtered = filtered.filter(
        (exp) => new Date(exp.date).getTime() >= new Date(filters.startDate).getTime()
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (exp) => new Date(exp.date).getTime() <= new Date(filters.endDate).getTime()
      );
    }

    setFilteredExpenses(filtered);
  };

  return (
    <div className="expense-list">
      <h2 className="expense-list-title">Expense List</h2>
      <FilterPanel onFilter={handleFilter} />
      {filteredExpenses.length === 0 ? (
        <p className="expense-list-empty">No expenses found.</p>
      ) : (
        <table className="expense-list-table">
          <thead>
            <tr>
              <th>Expense Nmae</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr className="expense-item" key={expense.id}>
                <td className="expense-item-title">{expense.title}</td>
                <td className="expense-item-amount">${expense.amount}</td>
                <td className="expense-item-category">{expense.category}</td>
                <td className="expense-item-date">{expense.date}</td>
                <td>
                  <button className="expense-item-delete" onClick={() => deleteExpense(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
