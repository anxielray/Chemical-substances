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
        <h1 className="detail-title">{substance.name || "Unknown"}</h1>
        <p className="detail-formula">
          <strong>Formula:</strong> {substance.formula || "N/A"}
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
            <strong>Uses:</strong>{" "}
            {substance.uses.length > 1
              ? substance.uses.join(", ")
              : substance.uses[0]}
          </p>
        )}

        {/* Hazards */}
        {substance.hazards && substance.hazards.length > 0 && (
          <p>
            <strong>Hazards:</strong>{" "}
            {substance.hazards.length > 1
              ? substance.hazards.join(", ")
              : substance.hazards[0]}
          </p>
        )}

        {/* Description */}
        <p className="detail-description">
          {substance.description || "No description available."}
        </p>
      </div>
    </div>
  );
}
