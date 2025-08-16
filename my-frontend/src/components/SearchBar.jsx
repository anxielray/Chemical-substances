import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../App.css";

export default function SearchBar({ query, setQuery }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`search-bar ${focused ? "focused" : ""}`}>
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search substances..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
