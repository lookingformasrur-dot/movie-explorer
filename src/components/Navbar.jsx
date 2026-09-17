import { useState } from "react";
import "./Navbar.css"

function Navbar({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <nav>
      <h2>🎬 MovieExploral</h2>

      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("home");
          }}
        >
          Home
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("movies");
          }}
        >
          Movies
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
