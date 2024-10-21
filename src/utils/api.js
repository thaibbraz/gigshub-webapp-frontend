import axios from "axios";

const BASE_URL =
  "https://fastapi-service-03-160893319817.europe-southwest1.run.app";

async function signup_login(formData, endpoint) {
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await axios.post(
      `${BASE_URL}${endpoint}`,
      formData,
      options
    );

    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function login(formData) {
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await axios.post(
      "https://fastapi-service-03-160893319817.europe-southwest1.run.app/signup",
      formData,
      options
    );

    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
    }
  } catch (error) {
    throw new Error(error);
  }
}

function logout() {
  localStorage.removeItem("token");
}
