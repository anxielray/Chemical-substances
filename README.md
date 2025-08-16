# 🧪 Chemistry Substances Explorer

This project is a **React-based web application** for exploring chemical substances and their properties.  
It allows users to browse through a list of chemical compounds, view detailed information, and learn about their uses, hazards, and physical characteristics.

---

## 🚀 Features

- **Substance Listing**  
  Displays a list of chemical substances with their **name, formula, and category**.

- **Detail View**  
  Clicking on a substance redirects the user to `/substances/:id` where a detailed view is shown with:

  - Image of the substance
  - Name and chemical formula
  - Type (organic, inorganic, element, etc.)
  - Molar mass
  - State at room temperature
  - Uses and hazards
  - Extended description

- **Dynamic Navigation**  
  Instead of relying on state alone, clicking a substance changes the `window.location` to `/substances/:id`.

- **Error Handling**  
  If a substance is not found, a clear ❌ "Substance not found" message is shown.

---

## 🛠️ Tech Stack

- **Frontend:** React + JSX
- **Styling:** CSS (with a global `index.css`)
- **Routing / Navigation:** Window location manipulation (`/substances/:id`)
- **Data Source:** In-memory JavaScript objects / JSON (extensible for API integration later)

---

## 📂 File Structure

```sh
.
├── api
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   └── substances.json
├── backend
│   ├── go.mod
│   ├── go.sum
│   └── main.go
├── my-frontend
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── images
│   │   │   └── chemistry-is-fun-funny-phrase-with-periodic-table-chemical-elements_585425-9.png
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ModalDetail.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SubstanceCard.jsx
│   │   ├── data
│   │   │   └── substances.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── About.jsx
│   │       ├── Contact.jsx
│   │       ├── Home.jsx
│   │       ├── SubstanceDetail.jsx
│   │       └── Substances.jsx
│   └── vite.config.js
├── .gitignore
├── Makefile
└── README.md
```

---

## 🧾 Example Substance Data

```js
export const substances = [
  {
    id: 1,
    name: "Water",
    formula: "H₂O",
    type: "Compound",
    molar_mass: 18.015,
    state_at_room_temp: "Liquid",
    uses: ["Drinking", "Cooling", "Solvent"],
    hazards: ["None under normal conditions"],
    description: "Water is essential for life and is the most common solvent.",
    image: "/images/water.png",
  },
  {
    id: 2,
    name: "Carbon Dioxide",
    formula: "CO₂",
    type: "Compound",
    molar_mass: 44.01,
    state_at_room_temp: "Gas",
    uses: ["Carbonation in drinks", "Fire extinguishers"],
    hazards: ["Asphyxiation at high concentrations"],
    description:
      "CO₂ is a greenhouse gas and plays a major role in Earth's climate.",
    image: "/images/co2.png",
  },
];
```

## 📜 Component: `SubstanceDetail.jsx`

```jsx
import "../index.css";

export default function SubstanceDetail({ substance }) {
  if (!substance) return <p className="not-found">❌ Substance not found.</p>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        {/* Image */}
        {substance.image && (
          <img
            src={substance.image}
            alt={substance.name}
            className="detail-image"
          />
        )}

        {/* Header */}
        <h1 className="detail-title">{substance.name}</h1>
        <p className="detail-formula">
          <strong>Formula:</strong> {substance.formula}
        </p>

        {/* Details */}
        <p>
          <strong>Type:</strong> {substance.type || "Uncategorized"}
        </p>
        <p>
          <strong>Molar Mass:</strong>{" "}
          {substance.molar_mass ? `${substance.molar_mass} g/mol` : "N/A"}
        </p>
        <p>
          <strong>State at Room Temp:</strong>{" "}
          {substance.state_at_room_temp || "Unknown"}
        </p>

        {/* Uses */}
        {substance.uses && substance.uses.length > 0 && (
          <p>
            <strong>Uses:</strong> {substance.uses.join(", ")}
          </p>
        )}

        {/* Hazards */}
        {substance.hazards && substance.hazards.length > 0 && (
          <p>
            <strong>Hazards:</strong> {substance.hazards.join(", ")}
          </p>
        )}

        {/* Description */}
        <p className="detail-description">{substance.description}</p>
      </div>
    </div>
  );
}
```

## 🔗 Navigation (Clicking a Substance)

When a user clicks on a substance card in SubstanceList.jsx, the following logic is applied:

```jsx
const handleClick = (substance) => {
  window.location.href = `/substances/${substance.id}`;
};
```

This ensures that the page URL updates properly, allowing for direct linking and bookmarking.

## ✅ Future Improvements

- Add React Router for better navigation instead of using window.location.

- Support search and filtering by name, formula, or type.

- Add API integration for fetching live chemical data.

- Improve UI with animations and responsive design.

- Implement safety categorization with hazard symbols (GHS pictograms).

## 📜 License

MIT License © 2025

## 👨‍💻 Author

Developed by [Raymond](https://github.com/anxielray)
Versatile software developer and AI innovator passionate about building educational tools.
