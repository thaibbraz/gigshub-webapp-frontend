import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";

const Login = () => {
  return (
    <Container className="bg-bright-purple">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        <form className="flex flex-col w-80">
          <input
            type="email"
            placeholder="E-mail"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blue"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blue"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-bright-purple text-white border border-white rounded-md cursor-pointer hover:bg-dark-purple hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center w-full h-full bg-bright-purple border border-white rounded-md hover:bg-dark-purple">
              <span className="text-md font-normal">Log In</span>
            </div>
          </button>
        </form>
        <p className="mt-6 text-center text-lg text-white">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </Container>
  );
};

export default Login;
