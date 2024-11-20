// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmAVvW60ypN8PQv7Rgf_LeI05RkOICME8",
    authDomain: "gigshub-ff21e.firebaseapp.com",
    projectId: "gigshub-ff21e",
    storageBucket: "gigshub-ff21e.firebasestorage.app",
    messagingSenderId: "390721411415",
    appId: "1:390721411415:web:1452cdfe1b079b6f544612",
    measurementId: "G-1WKWMLX4SP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };