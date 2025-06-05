import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) throw new Error("معرف الرابط غير موجود");

    const docRef = doc(db, "links", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("الرابط غير موجود");

    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    await updateDoc(docRef, {
      clicks: increment(1),
      uniqueClicks: arrayUnion(ip),
      lastAccessed: new Date()
    });

    let originalURL = docSnap.data().originalURL;
    if (!originalURL.startsWith('http://') && !originalURL.startsWith('https://')) {
      originalURL = 'http://' + originalURL;
    }

    window.location.replace(originalURL);
  } catch (error) {
    console.error("Error:", error);
    document.querySelector('.redirect-container').innerHTML = `
      <h1>❌ خطأ في التوجيه</h1>
      <p>${error.message}</p>
      <a href="index.html" class="home-link">العودة للصفحة الرئيسية</a>
    `;
  }
});
