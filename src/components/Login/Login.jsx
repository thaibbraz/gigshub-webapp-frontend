import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";
import { auth, provider, checkUserExists } from "../../utils/firebase.js";
import { useAuth } from "../../context/AuthContext";
import Error from "../Error/Error.jsx";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const EMPTY_FORM = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(EMPTY_FORM);
  // Firebase configuration
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const db = getDatabase(app);

  async function checkUserExists(userId) {
    try {
      const dbRef = ref(db); // Reference to the database
      const snapshot = await get(child(dbRef, `/`)); // Path to the user node
      if (snapshot.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); // Fetch ID token
      const refreshToken = user.refreshToken; // Get the refresh token
      // Extension ID
      const extensionId = "jphiibpfnbfejbglddjlcgnlfdallbak";

      if (user) {
        try {
          // Send both ID token and refresh token to the Chrome extension
          const response = await window.chrome.runtime.sendMessage(
            extensionId,
            {
              action: "login",
              token: token,
              refreshToken: refreshToken,
            }
          );
        } catch (error) {
          console.error("Error sending message to extension:", error);
        }
      }

      // Redirect to Dashboard
      login();
      if ((await checkUserExists(user.uid)) === false) {
        navigate("/welcome");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container className="bg-bright-purple">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8 animate-spin-slow"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        {error && <Error message={error} />}
        {/*<form className="flex flex-col w-80" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blue"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blue"
          />
          <button onClick={handleGoogleLogin} className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-white border border-white rounded-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out" >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="Google logo"
                    style={googleLogoStyle}
                />
                <span>Continue with Google</span>
            </button>
          <button
            type="submit"
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-bright-purple text-white border border-white rounded-md cursor-pointer hover:bg-dark-purple hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center w-full h-full bg-bright-purple border border-white rounded-md hover:bg-dark-purple">
              <span className="text-md font-normal">
                {loading ? "Logging in..." : "Log In"}
              </span>
            </div>
          </button>
        </form>*/}
        <div className="flex flex-col w-80">
          <button
            onClick={handleGoogleLogin}
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-white border border-white rounded-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              style={googleLogoStyle}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
        {/*<p className="mt-6 text-center text-lg text-white">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="cursor-pointer">Sign up</span>
        </p>*/}
      </div>
    </Container>
  );
};

const googleLogoStyle = {
  width: "20px",
  height: "20px",
  marginRight: "10px",
};

export default Login;
