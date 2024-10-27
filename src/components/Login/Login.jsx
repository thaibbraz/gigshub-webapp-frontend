import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";
import { sendRequest } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const EMPTY_FORM = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendRequest(formData, "/login");
      login();
      navigate("/dashboard");
    } catch (error) {
      throw new Error(error);
    } finally {
      setFormData(EMPTY_FORM);
      setLoading(false);
    }
  }

  return (
    <Container className="bg-bright-purple">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8 animate-spin-slow"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        <form className="flex flex-col w-80" onSubmit={handleLogin}>
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
        </form>
        <p className="mt-6 text-center text-lg text-white">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="cursor-pointer">Sign up</span>
        </p>
      </div>
    </Container>
  );
};

export default Login;
