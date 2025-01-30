// ExpenseForm.js
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-2"
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
        className="w-full p-2 border rounded mb-2"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;