import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2 className="title">EXPENSE TRACKER</h2>
      <div className="nav-items">
        <Link to="/expenses">Expenses</Link>
        <Link to="/add-expense">Add Expense</Link>
        <Link to="/charts">Charts</Link>
      </div>
    </div>
  );
};

export default Navbar;
