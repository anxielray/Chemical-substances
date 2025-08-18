# 🧪 Chemistry Substances Explorer

This project is a **React-based web application** for exploring chemical substances and their properties in foods.  
It enables a user to scrutinize the substances that are found in their foods. This could help with diet-management individuals to avoid or access some nutrients.

---

## 🚀 Features

- **Substance Listing**  
  Displays a list of chemical substances with their **name, formula, and category**. The application also provides more details about the food substance.

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
  ...
];
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
