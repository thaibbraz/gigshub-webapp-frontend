import axios from "axios";

const BASE_URL =
  "https://fastapi-service-03-160893319817.europe-southwest1.run.app";

export async function sendRequest(data, endpoint, setLoggedIn) {
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.post(`${BASE_URL}${endpoint}`, data, options);
    if (response.status === 200) {
      setLoggedIn(true);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
    }
  } catch (error) {
    logout(setLoggedIn);
    throw new Error(error);
  }
}

export function logout(setLoggedIn) {
  setLoggedIn(false);
  localStorage.removeItem("token");
}
