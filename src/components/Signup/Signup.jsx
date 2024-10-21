import { useState } from "react";
import { Container } from "../../components/Container/Container";
import logoTextGigshub from "../../assets/logo-text-gigshub.png";
import logoLightPurple from "../../assets/logoLightPurple.svg";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const EMPTY_FORM = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendRequest(formData, "/signup");
      login();
      navigate("/settings");
    } catch (error) {
      throw new Error(error);
    } finally {
      setFormData(EMPTY_FORM);
      setLoading(false);
    }
  }

  return (
    <Container className="bg-bright-purple">
      <div className="flex flex-col items-center justify-center min-h-screen bg-liliac">
        <img
          src={logoLightPurple}
          alt="Logo"
          className="h-logoLogin w-logoLogin mb-8 animate-spin-slow"
        />
        <img src={logoTextGigshub} alt="Logo text" className=" mb-8" />
        <form className="flex flex-col w-80" onSubmit={handleSignup}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-4 py-4 px-6 border rounded-md focus:outline-none focus:border-dark-blue h-input font-light placeholder-gray-400 placeholder-opacity-100 focus:placeholder-dark-blue shadow-md dark-blu"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-full h-10 mt-4 py-0.5 px-0.5 bg-bright-purple text-white border border-white rounded-md cursor-pointer hover:bg-dark-purple hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center w-full h-full bg-bright-purple border border-white rounded-md hover:bg-dark-purple">
              <span className="text-md font-normal">
                {loading ? "Signing up..." : "Sign Up"}
              </span>
            </div>
          </button>
        </form>
        <p className="mt-6 text-center text-lg text-white">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
