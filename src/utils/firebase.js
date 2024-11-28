// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child} from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmAVvW60ypN8PQv7Rgf_LeI05RkOICME8",
  authDomain: "gigshub-ff21e.firebaseapp.com",
  projectId: "gigshub-ff21e",
  storageBucket: "gigshub-ff21e.firebasestorage.app",
  databaseURL: "https://gigshub-ff21e-default-rtdb.europe-west1.firebasedatabase.app",
  messagingSenderId: "390721411415",
  appId: "1:390721411415:web:1452cdfe1b079b6f544612",
  measurementId: "G-1WKWMLX4SP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

async function checkUserExists(userId) {
    try {
        console.log("Checking user with ID:", userId); // Debug log
        const dbRef = ref(database); // Reference to the database
        console.log("Database reference:", dbRef);
        const snapshot = await get(child(dbRef, `users/${userId}`)); // Path to the user node
        
        console.log("Snapshot fetched:", snapshot); // Log the snapshot object
    
        if (snapshot.exists()) {
            console.log("User exists:", snapshot.val());
            return true;
        } else {
            console.log("User does not exist or no users node in the database.");
            return false;
        }
        } catch (error) {
        console.error("Error checking user:", error);
        return false;
        }
}


const addUserData = async (userId, data) => {
    try {
        if (!userId) throw new Error("User ID is undefined");
        if (!data || typeof data !== "object") throw new Error("Invalid data");
        
        // Sanitize the data to remove any undefined or circular references
        const sanitizedData = JSON.parse(JSON.stringify(data));

        // Reference to the user's data in the database
        const userRef = ref(database, `users/${userId}`);
        
        // Check if the user already exists in the database
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            // If user exists, returns
            return;
        }

        // If user does not exist, create new user data
        await set(userRef, sanitizedData);
        console.log("User data successfully added.");
    } catch (error) {
        console.error("Error adding or updating user data:", error);
    }
};


export { database, ref, set, get, auth, provider, addUserData, checkUserExists, signInWithPopup };