import "../index.css";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { substances as localSubstances } from "../data/substances";
import FilterPanel from "../components/FilterPanel";
import ModalDetail from "../components/ModalDetail";

export default function Substances() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [backendSubstances, setBackendSubstances] = useState([]);
  const [usingBackend, setUsingBackend] = useState(false);

  const categories = [
    "All",
    ...new Set(localSubstances.map((s) => s.category || "Uncategorized")),
  ];

  useEffect(() => {
    const fetchFromBackend = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        // Assuming your backend returns an array of substances directly
        const substancesArray = Array.isArray(data) ? data : data.data || [];

        // Map each item to frontend card model
        const mapped = substancesArray.map((s, index) => ({
          id: s.id || index + 1,
          name: s.name || "Unknown",
          formula: s.formula || "N/A",
          image: s.image || "https://img.freepik.com/premium-vector/chemistry-is-fun-funny-phrase-with-periodic-table-chemical-elements_585425-9.jpg",
          description: s.description || "No description available",
          category: s.type || "Uncategorized",
          type: s.type || "Unknown",
          molar_mass: s.molar_mass || "N/A",
          state_at_room_temp: s.state_at_room_temp || "N/A",
          uses: Array.isArray(s.uses) ? s.uses : [],
          hazards: Array.isArray(s.hazards) ? s.hazards : [],
          rating: s.rating || 0,
        }));

        // Sort by ID
        const sorted = mapped.sort((a, b) => a.id - b.id);

        setBackendSubstances(sorted);
      } catch (err) {
        console.error("Error fetching from backend:", err);
      }
    };

    if (query.length >= 1) {
      fetchFromBackend();
      setUsingBackend(true);
    } else if (query.length === 0) {
      setUsingBackend(false);
    }
  }, [query]);

  // Choose dataset
  const dataset = usingBackend ? backendSubstances : localSubstances;

  const filtered = dataset.filter((sub) => {
    const matchesCategory = category === "All" || sub.category === category;

    const matchesQuery =
      query.length <= 1
        ? true
        : sub.name.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="substances-container">
      <h1 className="page-title">Browse Substances</h1>

      {/* Search + Filter */}
      <div className="search-filter">
        <SearchBar query={query} setQuery={setQuery} />
        <FilterPanel
          className="category-select"
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Substance Grid */}
      <div className="substance-grid">
        {filtered.length ? (
          filtered.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelected(sub)}
              className="substance-card"
            >
              <h2 className="substance-name">{sub.name}</h2>
              <p className="substance-formula">{sub.formula}</p>
              <p className="substance-description">{sub.description}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No substances found.</p>
        )}
      </div>

      {/* Modal */}

      <ModalDetail substance={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
