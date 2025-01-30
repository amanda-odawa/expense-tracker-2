import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

const App = () => {
  const [expenses, setExpenses] = useState([]); // Expense state

  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/expenses"
          element={<ExpenseList expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route path="/add-expense" element={<ExpenseForm setExpenses={setExpenses} />} />
        <Route path="/charts" element={<ExpenseChart expenses={expenses} />} />
        <Route path="/" element={<ExpenseList expenses={expenses} setExpenses={setExpenses} />} />
      </Routes>
    </div>
  );
};

export default App;
