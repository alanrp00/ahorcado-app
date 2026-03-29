// firebaseConfig.js
// Importamos las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * CONFIGURACIÓN DE FIREBASE
 * Reemplaza estos valores con los que te dé la consola de Firebase 
 * al crear tu proyecto web.
 */
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializamos la aplicación de Firebase con nuestra configuración
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos la base de datos (Firestore) 
// para poder usarla en cualquier parte de nuestro juego
export const db = getFirestore(app);