import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBP0oQPZ4E9zaOYZGNVjqWxyjXde2SnOxs",
  authDomain: "short-link8288.firebaseapp.com",
  projectId: "short-link8288",
  storageBucket: "short-link8288.appspot.com",
  messagingSenderId: "316156644329",
  appId: "1:316156644329:web:ed593b1e7e465a01901978",
  measurementId: "G-HFG4329G97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

// ... (الكود السابق كما هو)
