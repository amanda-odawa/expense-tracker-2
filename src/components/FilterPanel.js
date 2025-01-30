// src/components/FilterPanel.js
import { useState } from "react";
import "../Styles/FilterPanel.css";

function FilterPanel({ onFilter }) {
    const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      const updatedFilters = { ...filters, [name]: value }; // Update specific filter
      setFilters(updatedFilters);
      onFilter(updatedFilters); // Pass updated filters to parent
    };
  
    return (
      <div>
        {/* Category filter */}
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
  
        {/* Date range filter */}
        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
      </div>
    );
  };
  
export default FilterPanel;
  