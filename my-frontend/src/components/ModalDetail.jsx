import "../App.css";
import SubstanceCard from "./SubstanceCard";

export default function ModalDetail({ substance, onClose }) {
  if (!substance) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        {/* Render the full SubstanceCard inside the modal */}
        <SubstanceCard substance={substance} onClick={() => {}} />
      </div>
    </div>
  );
}
