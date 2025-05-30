import { Link, useLocation } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { FaHome, FaNewspaper, FaEnvelope, FaLock } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { isAdmin } = useBlog();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaNewspaper className="icon-medium" /> Mi Blog
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              <FaHome className="icon-small" /> Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`}>
              <FaNewspaper className="icon-small" /> Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className={`nav-link ${location.pathname === "/contacto" ? "active" : ""}`}>
              <FaEnvelope className="icon-small" /> Contáctanos
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-link admin-link ${location.pathname === "/admin" ? "active" : ""}`}>
                <FaLock className="icon-small" /> Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;