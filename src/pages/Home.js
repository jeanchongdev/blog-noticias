import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import NoticiaCard from "../components/NoticiaCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { noticias, loading } = useBlog();
  const noticiasRecientes = noticias.slice(0, 3);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Nuestro Blog</h1>
          <p>Mantente al día con las últimas noticias y actualizaciones</p>
          <Link to="/blog" className="cta-button">
            Ver Todas las Noticias
          </Link>
        </div>
      </section>

      <section className="recent-news">
        <div className="container">
          <h2>Noticias Recientes</h2>
          {noticiasRecientes.length === 0 ? (
            <p className="no-noticias">No hay noticias disponibles en este momento.</p>
          ) : (
            <div className="noticias-grid">
              {noticiasRecientes.map((noticia) => (
                <NoticiaCard key={noticia._id} noticia={noticia} />
              ))}
            </div>
          )}
          {noticias.length > 3 && (
            <div className="ver-mas">
              <Link to="/blog" className="ver-mas-btn">
                Ver más noticias →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;