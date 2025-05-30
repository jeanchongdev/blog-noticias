import { useState } from "react";
import { useBlog } from "../context/BlogContext";
import AdminLogin from "../components/AdminLogin";
import { FaPlus, FaTrash, FaNewspaper, FaEdit, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import { logoutAdmin } from "../services/authService";

const Admin = () => {
  const { noticias, agregarNoticia, eliminarNoticia, isAdmin, loading } = useBlog();
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
  });

  if (!isAdmin) {
    return <AdminLogin />;
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás segura de que quieres cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#667eea",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await logoutAdmin();
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente",
        confirmButtonColor: "#667eea",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.titulo.trim() && formData.contenido.trim()) {
      const result = await agregarNoticia(formData);

      if (result.success) {
        setFormData({ titulo: "", contenido: "" });
        Swal.fire({
          icon: "success",
          title: "¡Publicado!",
          text: "La noticia ha sido publicada exitosamente",
          confirmButtonColor: "#4caf50",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `No se pudo publicar la noticia: ${result.error}`,
          confirmButtonColor: "#667eea",
        });
      }
    }
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Estás segura?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4757",
      cancelButtonColor: "#667eea",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await eliminarNoticia(id);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Eliminada",
            text: "La noticia ha sido eliminada",
            confirmButtonColor: "#667eea",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `No se pudo eliminar la noticia: ${response.error}`,
            confirmButtonColor: "#667eea",
          });
        }
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin">
      <div className="container">
        <div className="admin-header">
          <h1>
            <FaEdit className="icon-medium" /> Panel de Administración
          </h1>
          <p>Gestiona las noticias del blog</p>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="icon-small" /> Cerrar Sesión
          </button>
        </div>

        <div className="admin-content">
          <div className="nueva-noticia">
            <h2>
              <FaPlus className="icon-small" /> Publicar Nueva Noticia
            </h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Escribe el título de la noticia"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contenido">Contenido</label>
                <textarea
                  id="contenido"
                  name="contenido"
                  rows="6"
                  value={formData.contenido}
                  onChange={handleChange}
                  placeholder="Escribe el contenido de la noticia"
                  required
                ></textarea>
              </div>
              <button type="submit" className="publish-btn">
                <FaNewspaper className="icon-small" /> Publicar Noticia
              </button>
            </form>
          </div>

          <div className="noticias-admin">
            <h2>
              <FaNewspaper className="icon-small" /> Noticias Publicadas ({noticias.length})
            </h2>
            {noticias.length === 0 ? (
              <p>No hay noticias publicadas.</p>
            ) : (
              <div className="admin-noticias-list">
                {noticias.map((noticia) => (
                  <div key={noticia.id} className="admin-noticia-item">
                    <div className="noticia-info">
                      <h3>{noticia.titulo}</h3>
                      <p>{noticia.contenido.substring(0, 100)}...</p>
                      <small>Publicado: {noticia.fecha.toLocaleString()}</small>
                    </div>
                    <button onClick={() => handleEliminar(noticia.id)} className="delete-btn">
                      <FaTrash className="icon-small" /> Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;