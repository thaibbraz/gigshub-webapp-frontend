// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmAVvW60ypN8PQv7Rgf_LeI05RkOICME8",
  authDomain: "gigshub-ff21e.firebaseapp.com",
  projectId: "gigshub-ff21e",
  storageBucket: "gigshub-ff21e.firebasestorage.app",
  databaseURL:
    "https://gigshub-ff21e-default-rtdb.europe-west1.firebasedatabase.app",
  messagingSenderId: "390721411415",
  appId: "1:390721411415:web:1452cdfe1b079b6f544612",
  measurementId: "G-1WKWMLX4SP",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

const provider = new GoogleAuthProvider();
const database = getDatabase(app);

async function checkUserExists(userId) {
  try {
    const dbRef = ref(database);

    const snapshot = await get(child(dbRef, `users/${userId}`));

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
  console.log('addUserData', userId, data);
  try {
    if (!userId) throw new Error("User ID is undefined");
    if (!data || typeof data !== "object") throw new Error("Invalid data");
    const sanitizedData = JSON.parse(JSON.stringify(data));

    const userRef = ref(database, `users/${userId}`);

    // Thiago, I commented this out to be able to update the data
   
    const snapshot = await get(userRef);
    if(snapshot.exists()) {
      return;
    }
    
    return await set(userRef, sanitizedData);
  } catch (error) {
    console.error("Error adding or updating user data:", error);
  }
};
const updateUserData = async (userId, data) => {
  console.log('updateUserData', userId, data);
  try {
    if (!userId) throw new Error("User ID is undefined");
    if (!data || typeof data !== "object") throw new Error("Invalid data");

    const sanitizedData = JSON.parse(JSON.stringify(data));
    const userRef = ref(database, `users/${userId}`);

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const updatedData = { ...existingData, ...sanitizedData };
      await set(userRef, updatedData);
    } else {
      await set(userRef, sanitizedData);
    }
    console.log("User data added or updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

const getUserCVData = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is undefined");

    // Reference to the CV data in the database
    const cvRef = ref(database, `users/${userId}/cv`);

    // Fetch the CV data
    const snapshot = await get(cvRef);
    if (snapshot.exists()) {
      console.log("CV data fetched:", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No CV data found for this user.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching CV data:", error);
    return null;
  }
};

export {
  database,
  ref,
  set,
  get,
  auth,
  provider,
  addUserData,
  checkUserExists,
  signInWithPopup,
  getUserCVData,
  updateUserData
};
