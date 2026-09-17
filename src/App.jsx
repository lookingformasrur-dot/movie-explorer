import { useState } from "react";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "home" ? <Home setPage={setPage} /> : <Movies />}

      <Footer />
    </div>
  );
}

export default App;
