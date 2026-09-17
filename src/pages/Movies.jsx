import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Movies.css";

function Movies() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchMovies = async () => {
        setLoading(true);
        setError("");

        try {
          if (search.trim() === "") {
            const response = await fetch("https://api.tvmaze.com/shows");

            if (!response.ok) {
              throw new Error("Failed to fetch movies");
            }

            const data = await response.json();

            setShows(data);
            return;
          }

          const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${search}`,
          );

          if (!response.ok) {
            throw new Error("Failed to search movies");
          }

          const data = await response.json();

          const results = data.map((item) => item.show);

          setShows(results);
        } catch (error) {
          console.error(error);

          setError("Failed to load movies. Please try again.");
          setShows([]);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <main>
      <h1>Explore Movies</h1>

      <p className="movie-count">{shows.length} movies found</p>

      <input
        className="movie-search"
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Movie Grid */}
      <div className="movie-grid">
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p>{error}</p>
        ) : shows.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          shows.map((show) => (
            <MovieCard key={show.id} show={show} onDetails={setSelectedShow} />
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedShow && (
        <div className="modal" onClick={() => setSelectedShow(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="modal-close"
              onClick={() => setSelectedShow(null)}
            >
              ✕
            </button>

            {/* Poster */}
            <img
              src={
                selectedShow.image?.original ||
                selectedShow.image?.medium ||
                "https://via.placeholder.com/600x400?text=No+Poster"
              }
              alt={selectedShow.name}
            />

            {/* Title */}
            <h2>{selectedShow.name}</h2>

            {/* Rating */}
            <p>⭐ Rating: {selectedShow.rating?.average || "N/A"}</p>

            {/* Release Date */}
            <p>📅 Release: {selectedShow.premiered || "Unknown"}</p>

            {/* Genre */}
            <p>Genre: {selectedShow.genres?.join(", ") || "N/A"}</p>

            {/* Status */}
            <p>Status: {selectedShow.status || "N/A"}</p>

            {/* Language */}
            <p>Language: {selectedShow.language || "N/A"}</p>

            {/* Summary */}
            <p
              dangerouslySetInnerHTML={{
                __html: selectedShow.summary || "No description available.",
              }}
            ></p>

            {/* Official Website */}
            {selectedShow.officialSite && (
              <a
                href={selectedShow.officialSite}
                target="_blank"
                rel="noreferrer"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Movies;
