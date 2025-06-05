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

const urlInput = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const resultDiv = document.getElementById('result');
const shortUrlElement = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');

shortenBtn.addEventListener('click', async () => {
  const originalURL = urlInput.value.trim();
  
  if (!originalURL) {
    alert('الرجاء إدخال رابط صحيح');
    return;
  }

  try {
    shortenBtn.disabled = true;
    shortenBtn.textContent = 'جاري المعالجة...';

    // إنشاء معرف فريد للرابط
    const shortId = Math.random().toString(36).substring(2, 10);
    
    // التأكد من أن الرابط يحتوي على بروتوكول
    let finalURL = originalURL;
    if (!finalURL.startsWith('http://') && !finalURL.startsWith('https://')) {
      finalURL = 'http://' + finalURL;
    }

    // حفظ البيانات في Firebase
    await setDoc(doc(db, "links", shortId), {
      originalURL: finalURL,
      createdAt: serverTimestamp(),
      clicks: 0,
      uniqueClicks: [],
      lastAccessed: null
    });

    // عرض الرابط المختصر
    const shortURL = `${window.location.origin}/redirect.html?id=${shortId}`;
    shortUrlElement.href = shortURL;
    shortUrlElement.textContent = shortURL;
    
    resultDiv.style.display = 'block';
    urlInput.value = '';
  } catch (error) {
    console.error('Error:', error);
    alert('حدث خطأ أثناء اختصار الرابط: ' + error.message);
  } finally {
    shortenBtn.disabled = false;
    shortenBtn.textContent = 'اختصر الرابط';
  }
});

copyBtn.addEventListener('click', () => {
  const textToCopy = shortUrlElement.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyBtn.textContent = 'تم النسخ!';
    setTimeout(() => {
      copyBtn.textContent = 'نسخ';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
});
