// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNSu4TygKgaadaL8NyrxhUlthDMT4dxBY",
  authDomain: "nss-mmut.firebaseapp.com",
  projectId: "nss-mmut",
  storageBucket: "nss-mmut.firebasestorage.app",
  messagingSenderId: "767830206576",
  appId: "1:767830206576:web:00ff82feef375fb3edacb5",
  measurementId: "G-W8JXBLPGL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;