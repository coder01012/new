// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = { /* نفس بياناتك */ };
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

  const shortURL = `${location.origin}/short-link/redirect.html?id=${shortId}`;
  resultDiv.textContent = `🔗 الرابط المختصر: ${shortURL}`;
  resultDiv.innerHTML = `<a href="${shortURL}" target="_blank">${shortURL}</a>`;
  urlInput.value = "";
});
