import { formatearFecha } from "../utils/dateUtils";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const NoticiaCard = ({ noticia }) => {
  return (
    <article className="noticia-card">
      <div className="noticia-header">
        <h3>{noticia.titulo}</h3>
        <span className="noticia-fecha">
          <FaCalendarAlt className="icon-small" /> {formatearFecha(noticia.fecha)}
        </span>
      </div>
      <div className="noticia-content">
        <p>{noticia.contenido}</p>
      </div>
      <div className="noticia-footer">
        <span className="noticia-autor">
          <FaUser className="icon-small" /> {noticia.autor}
        </span>
      </div>
    </article>
  );
};

export default NoticiaCard;