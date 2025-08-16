import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import SubstanceDetail from "../pages/SubstanceDetail";
import RatingStars from "./RatingStars";

export default function SubstanceCard({ substance }) {
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    fetch(`http://localhost:3000/substances?id=${substance.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          console.error("Substance not found");
          return;
        }
        setSelectedSubstance(data);
        navigate(`/substances/${substance.id}`);
      })
      .catch((error) => console.error("Error fetching substance:", error));
  };

  return (
    <>
      <div className="substance-card" onClick={handleClick}>
        {/* Image */}
        <img
          src={substance.image}
          alt={substance.name}
          className="substance-image"
        />

        {/* Header */}
        <div className="substance-card-header">
          <h3 className="substance-name">{substance.name}</h3>
          <span className="substance-formula">{substance.formula}</span>
        </div>

        {/* Details */}
        <div className="substance-details">
          <p>
            <strong>Type:</strong> {substance.type || "Uncategorized"}
          </p>
          <p>
            <strong>Molar Mass:</strong>{" "}
            {substance.molar_mass ? `${substance.molar_mass} g/mol` : "N/A"}
          </p>
          <p>
            <strong>State:</strong> {substance.state_at_room_temp || "N/A"}
          </p>
          <p>
            <strong>Uses:</strong>{" "}
            {substance.uses?.length > 1
              ? substance.uses.join(", ")
              : substance.uses?.[0] || "N/A"}
          </p>
          {substance.hazards?.length > 0 && (
            <p>
              <strong>Hazards:</strong>{" "}
              {substance.hazards.length > 1
                ? substance.hazards.join(", ")
                : substance.hazards[0]}
            </p>
          )}
          <p className="substance-description">{substance.description}</p>
        </div>

        {/* Footer */}
        <div className="substance-card-footer">
          <RatingStars rating={substance.rating || 0} />
        </div>
      </div>

      {/* Modal Detail */}
      {selectedSubstance && (
        <SubstanceDetail
          substance={selectedSubstance}
          onClose={() => setSelectedSubstance(null)}
        />
      )}
    </>
  );
}
