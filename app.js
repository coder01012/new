import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBP0oQPZ4E9zaOYZGNVjqWxyjXde2SnOxs",
  authDomain: "short-link8288.firebaseapp.com",
  projectId: "short-link8288",
  storageBucket: "short-link8288.firebasestorage.app",
  messagingSenderId: "316156644329",
  appId: "1:316156644329:web:ed593b1e7e465a01901978",
  measurementId: "G-HFG4329G97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر الواجهة
const shortenBtn = document.getElementById("shortenBtn");
const originalLink = document.getElementById("originalLink");
const linksList = document.getElementById("linksList");

shortenBtn.addEventListener("click", async () => {
  const originalURL = originalLink.value.trim();
  if (!originalURL) return alert("من فضلك أدخل رابط");

  // توليد معرف مختصر عشوائي
  const shortID = Math.random().toString(36).substring(2, 8);

  // حفظ في قاعدة البيانات
  await setDoc(doc(db, "links", shortID), {
    originalURL,
    shortID,
    totalClicks: 0,
    uniqueClicks: 0,
    visitors: []
  });

  // عرض في القائمة
  const siteURL = "https://coder01012.github.io/short-link";
  const shortURL = `${siteURL}/?id=${shortID}`;
  const item = document.createElement("li");
  item.textContent = `📎 ${shortURL}`;
  linksList.appendChild(item);

  originalLink.value = "";
});
