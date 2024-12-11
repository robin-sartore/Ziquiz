// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVAPvEBg-9KnKMgrE5cFqxZrQiaCIlGsU",
  authDomain: "ziquiz-cb376.firebaseapp.com",
  databaseURL: "https://ziquiz-cb376-default-rtdb.europe-west1.firebasedatabase.app/",  // Aggiungi questa riga
  projectId: "ziquiz-cb376",
  storageBucket: "ziquiz-cb376.firebasestorage.app",
  messagingSenderId: "971536143420",
  appId: "1:971536143420:web:9534385c390bc939339f39",
  measurementId: "G-G3W2P5JLVZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, onAuthStateChanged, signOut };


