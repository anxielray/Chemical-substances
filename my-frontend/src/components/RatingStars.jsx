export default function RatingStars({ rating }) {
  return (
    <div className="rating-stars" role="img" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star ${i < rating ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
import "../App.css";