import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA6hd-0hG-7EqrfVI9RdQjghSH9fsrHB5k",
  authDomain: "kanbanflow-6a4c5.firebaseapp.com",
  projectId: "kanbanflow-6a4c5",
  storageBucket: "kanbanflow-6a4c5.firebasestorage.app",
  messagingSenderId: "958367851266",
  appId: "1:958367851266:web:8ee945583caf5f682d981b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;