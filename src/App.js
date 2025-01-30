// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./index.css"; // Global styles

const App = () => {
  const [expenses, setExpenses] = useState([]); // Expense state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Fetch expenses from json-server
  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Navbar onToggleTheme={toggleTheme} />
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
