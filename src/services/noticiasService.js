import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  orderBy, 
  query, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'noticias';

// Obtener todas las noticias en tiempo real
export const subscribeToNoticias = (callback) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    orderBy('fecha', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const noticias = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      fecha: doc.data().fecha?.toDate() || new Date()
    }));
    callback(noticias);
  });
};

// Agregar nueva noticia
export const agregarNoticia = async (noticia) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...noticia,
      fecha: serverTimestamp(),
      autor: 'Administrador'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al agregar noticia:', error);
    return { success: false, error: error.message };
  }
};

// Eliminar noticia
export const eliminarNoticia = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    return { success: false, error: error.message };
  }
};