import axios from "axios";

export async function sendRequest(data, endpoint) {
  try {
    const token = localStorage.getItem("token");
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.post(`${process.env.REACT_APP_BASE_URL}${endpoint}`, data, options);
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
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.post(`${process.env.REACT_APP_JOBS_URL}`, data, options);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 429) {
      throw new Error(
        "Job matching limited to 3 searches per day. Please upgrade to be matched with more jobs."
      );
    } else {
      throw new Error(error);
    }
  }
}
