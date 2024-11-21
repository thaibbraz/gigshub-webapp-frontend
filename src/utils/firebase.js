// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get} from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8",
    authDomain: "gdfsaddsfeapp.com",
    projectId: "bfdsbfdbfg-bfdbvfdbfd",
    storageBucket: "gfbdbfdsbfdbfdukmjhngbvfc.app",
    databaseURL: "AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8",
    messagingSenderId: "AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8",
    appId: "1:AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8:web:AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8",
    measurementId: "aaa-AIzaSyDmsdfaddsfdsfdsfeI05RkOICME8",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


export { database, ref, set, get, auth, provider };