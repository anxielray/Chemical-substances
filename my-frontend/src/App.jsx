import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Substances from "./pages/Substances";
import SubstanceDetail from "./pages/SubstanceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/substances" element={<Substances />} />
          <Route path="/substances/:id" element={<SubstanceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
