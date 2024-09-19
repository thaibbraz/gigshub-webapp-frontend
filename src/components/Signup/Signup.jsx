import React from "react";
import { Container } from "../../components/Container/Container";
import logoDarkPurple from "../../assets/logoDarkPurple.svg";

const Signup = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen bg-liliac">
        <img
          src={logoDarkPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-20"
        />

        <form className="flex flex-col w-80">
          <input
            type="name"
            placeholder="Name"
            className="mb-4 py-4 px-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue"
          />
          <input
            type="lastname"
            placeholder="Lastname"
            className="mb-4 py-4 px-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="mb-4 py-4 px-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 py-4 px-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue"
          />
          <button className="flex items-center justify-center w-full h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple">
            <div className="flex items-center justify-center w-full h-input bg-dark-blue rounded-2xl border-5">
              <span className="text-sm text-white font-normal">Sign Up</span>
            </div>
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-dark-blue">
            Log In
          </a>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
