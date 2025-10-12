// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNA4oWEj_jxKijRL98MeP5Hl63yIQBIww",
  authDomain: "chatingapp-c6abd.firebaseapp.com",
  projectId: "chatingapp-c6abd",
  storageBucket: "chatingapp-c6abd.firebasestorage.app",
  messagingSenderId: "638819652945",
  appId: "1:638819652945:web:afc65e56653b55d39a2f70",
  measurementId: "G-C1YBLVW1T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;