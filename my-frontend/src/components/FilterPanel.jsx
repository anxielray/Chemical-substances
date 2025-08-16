import "../App.css";

export default function FilterPanel({ selectedCategory, setCategory }) {
  const categories = ["All", "Essential", "Organic", "Inorganic"];

  return (
    <div className="filter-panel">
      <label htmlFor="category-select" className="filter-label">
        Filter by category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setCategory(e.target.value)}
        className="filter-select"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
