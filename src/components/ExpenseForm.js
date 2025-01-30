// src/components/ExpenseForm.js
import { useState } from "react";
import "../Styles/ExpenseForm.css";

const ExpenseForm = ({ setExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Bills", "Miscellaneous"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return;

    const newExpense = { id: Date.now(), title, amount: parseFloat(amount), category, date };

    fetch("http://localhost:3001/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    })
      .then((res) => res.json())
      .then((data) => setExpenses((prev) => [...prev, data]));

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2 className="expense-form-title">Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="input-field"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select-field"
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
        required
      />
      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;