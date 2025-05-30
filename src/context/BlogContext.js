import { createContext, useContext, useState, useEffect } from "react";
import { subscribeToNoticias, agregarNoticia as addNoticia, eliminarNoticia as deleteNoticia } from "../services/noticiasService";
import { subscribeToAuth } from "../services/authService";

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog debe ser usado dentro de BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [noticias, setNoticias] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribeAuth = subscribeToAuth((user) => {
      setUser(user);
      setIsAdmin(!!user); // Si hay usuario, es admin
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Escuchar cambios en las noticias en tiempo real
  useEffect(() => {
    const unsubscribeNoticias = subscribeToNoticias((noticiasData) => {
      setNoticias(noticiasData);
      setLoading(false);
    });

    return () => unsubscribeNoticias();
  }, []);

  const agregarNoticia = async (nuevaNoticia) => {
    const result = await addNoticia(nuevaNoticia);
    return result;
  };

  const eliminarNoticia = async (id) => {
    const result = await deleteNoticia(id);
    return result;
  };

  const value = {
    noticias,
    agregarNoticia,
    eliminarNoticia,
    isAdmin,
    setIsAdmin,
    loading,
    user,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};