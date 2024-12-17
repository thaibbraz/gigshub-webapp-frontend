import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";
import {
  auth,
  provider,
  checkUserExists,
  signInWithPopup,
} from "../../utils/firebase.js";
import { useAuth } from "../../context/AuthContext";
import Error from "../Error/Error.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      localStorage.removeItem("user");
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;

      if (!user) {
        console.error("No user returned from signInWithPopup");
        setError("Login failed. Please try again.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid || "",
          displayName: user.displayName || "Anonymous",
          email: user.email || "No email provided",
          photoURL: user.photoURL || "",
        })
      );

      const token = await user.getIdToken();
      const refreshToken = user.refreshToken;
      const extensionId = process.env.REACT_APP_EXTENSION_ID;

      if (window.chrome?.runtime?.sendMessage) {
        await window.chrome.runtime.sendMessage(extensionId, {
          action: "login",
          token,
          refreshToken,
        });
      } else {
        console.warn("Chrome extension not available");
      }

      login(); // Update your context/auth state
      const userExists = await checkUserExists(user.uid);
      navigate(userExists ? "/dashboard" : "/resume");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <Container className="bg-[#3F33C0]">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8 animate-spin-slow"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        {error && <Error message={error} />}

        <div className="flex flex-col w-80">
          <button
            onClick={handleGoogleLogin}
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-white border border-white rounded-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
