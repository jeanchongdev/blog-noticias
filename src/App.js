import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./App.css";
import axios from "axios";

// Configurar axios para la API
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;