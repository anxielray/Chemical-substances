import "../index.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero">
        <h1 className="hero-title">Welcome to Scientist Substance Explorer</h1>
        <p className="hero-subtitle">
          Search, explore, and learn about any chemical, food, or everyday substance.
        </p>
        <div className="hero-buttons">
          <Link to="/substances" className="btn btn-primary">
            Browse Substances
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>🔍 Powerful Search</h2>
          <p>Find substances instantly with smart filtering and category matching.</p>
        </div>
        <div className="feature-card">
          <h2>⚗️ Detailed Chemistry</h2>
          <p>View chemical formulas, structures, and scientific details with ease.</p>
        </div>
        <div className="feature-card">
          <h2>📚 Educational</h2>
          <p>Learn how each substance is used, produced, and affects our lives.</p>
        </div>
      </section>
    </div>
  );
}
