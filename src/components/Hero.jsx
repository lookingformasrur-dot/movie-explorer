import "./Hero.css";

function Hero({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p>welcome to movie exploral</p>

        <h1>
          discover your next <span>favorite Movie</span>
        </h1>

        <p>
          Explore movies and shows from around the world and discover something
          amazing to watch.
        </p>

        <button onClick={() => setPage("movies")}>Explore Movies</button>
      </div>
    </section>
  );
}

export default Hero;
