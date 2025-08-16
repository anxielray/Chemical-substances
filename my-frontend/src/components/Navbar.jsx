import { Link, NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-name">SubstanceApp</Link>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/substances" className="nav-item">Substances</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
