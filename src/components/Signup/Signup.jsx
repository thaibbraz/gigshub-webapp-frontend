import React from "react";
import { Container } from "../../components/Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";

const Signup = () => {
  return (
    <Container className="bg-bright-purple">
      <div className="flex flex-col items-center justify-center min-h-screen bg-liliac">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        <form className="flex flex-col w-80">
          <input
            type="name"
            placeholder="Name"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="lastname"
            placeholder="Last Name"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-bright-purple text-white border border-white rounded-md cursor-pointer hover:bg-dark-purple hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center w-full h-full bg-bright-purple border border-white rounded-md hover:bg-dark-purple">
              <span className="text-md font-normal">Sign Up</span>
            </div>
          </button>
        </form>
        <p className="mt-6 text-center text-lg text-white">
          Already have an account? <a href="/logi">Log In</a>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
