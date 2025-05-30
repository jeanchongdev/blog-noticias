import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase (reemplaza con la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyBXXtX7wFz6mL67Vb-rFa8jBS7-s2hLJgM",
  authDomain: "blog-noticias-2025.firebaseapp.com",
  projectId: "blog-noticias-2025",
  storageBucket: "blog-noticias-2025.firebasestorage.app",
  messagingSenderId: "957513192146",
  appId: "1:957513192146:web:f0ad47281867ca53f1930b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Auth
export const auth = getAuth(app);

export default app;