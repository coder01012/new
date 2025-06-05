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

const form = document.getElementById("shorten-form");
const urlInput = document.getElementById("url-input");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const originalURL = urlInput.value.trim();
  if (!originalURL) return;

  const shortId = Math.random().toString(36).substring(2, 8);

  await setDoc(doc(db, "links", shortId), {
    originalURL,
    createdAt: serverTimestamp(),
    clicks: 0,
    uniqueClicks: [],
  });

  const shortURL = `${location.origin}/redirect.html?id=${shortId}`;
  resultDiv.innerHTML = `<p>🔗 الرابط المختصر:</p><a href="${shortURL}" target="_blank">${shortURL}</a>`;
  urlInput.value = "";
});
