// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Dashboard from "./components/Dashboard";
import "./index.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard expenses={expenses} />} />
        <Route path="/expenses" element={<ExpenseList expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/add-expense" element={<ExpenseForm setExpenses={setExpenses} />} />
        <Route path="/charts" element={<ExpenseChart expenses={expenses} />} />
      </Routes>
    </div>
  );
};

export default App;