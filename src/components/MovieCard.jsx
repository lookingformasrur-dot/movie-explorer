import "./MovieCard.css";

function MovieCard({ show, onDetails }) {
  const poster =
    show.image?.medium || "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card">
      <img src={poster} alt={show.name} />

      <div className="movie-card-content">
        <h2>{show.name}</h2>

        <p>⭐ {show.rating?.average || "N/A"}</p>

        <p>📅 {show.premiered || "Unknown"}</p>

        <button onClick={() => onDetails(show)}>See Details</button>
      </div>
    </div>
  );
}

export default MovieCard;
