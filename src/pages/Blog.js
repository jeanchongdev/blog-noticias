import { useBlog } from "../context/BlogContext";
import NoticiaCard from "../components/NoticiaCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Blog = () => {
  const { noticias, loading } = useBlog();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="blog">
      <div className="container">
        <div className="blog-header">
          <h1>Todas las Noticias</h1>
          <p>Mantente informado con nuestras últimas publicaciones</p>
        </div>

        {noticias.length === 0 ? (
          <div className="no-noticias">
            <p>No hay noticias disponibles en este momento.</p>
          </div>
        ) : (
          <div className="noticias-grid">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia._id} noticia={noticia} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;