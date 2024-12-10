import axios from "axios";

const BASE_URL =
  // "https://fastapi-service-03-160893319817.europe-southwest1.run.app";
  "http://localhost:8000";

const JOBS_URL = "http://127.0.0.1:8001/jobs";

export async function sendRequest(data, endpoint) {
  try {
    const token = localStorage.getItem("token");
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.post(`${BASE_URL}${endpoint}`, data, options);
    if (
      (endpoint === "/login" || endpoint === "/signup") &&
      response.status === 200
    ) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
    } else return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function sendJobsRequest(data) {
  console.log("api.js payload: ", data);
  try {
    const token = localStorage.getItem("token");
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.post(`${JOBS_URL}`, data, options);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
