import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Iniciar sesión
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, error: error.message };
  }
};

// Cerrar sesión
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { success: false, error: error.message };
  }
};

// Escuchar cambios de autenticación
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};