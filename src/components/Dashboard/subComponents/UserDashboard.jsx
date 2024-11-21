import React, { useState, useEffect } from "react"; // Added useEffect here
import starsUnfilled from "../../../assets/starsUnfilled.svg";
import { database, ref, set, get } from "../../../utils/firebase.js";
import { add } from "date-fns";
const UserDashboard = ({ formData }) => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState(formData.jobTitle);
  const [location, setLocation] = useState(formData.location);
  const [cvFormData, setcvFormData] = useState(formData);
  const [loading, setLoading] = useState(false);
  // Function to fetch job data
  const fetchJobs = async () => {
    console.log("cvFormData", cvFormData);

    const requestBody = cvFormData;
      try {
          setLoading(true);
          if (cvFormData.cv.education[0].major) {
              cvFormData.cv.education[0].major = "";
          }
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user?.uid; // Ensure user ID is valid
          const newUserData = {
            email: user?.email || "",
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
            cv: requestBody,
          };
          await addUserData(userId, newUserData);
          alert("Submission successful!");
      } catch (error) {
          console.error("Error submitting form: ", error);
          alert("Error submitting the form. Please try again.");
      } finally {
          setLoading(false);
      }
    // Add jobTitle and location to the request body
    const bodyWithJobDetails = { ...requestBody, jobTitle, location};
    console.log("bodyWithJobDetails", JSON.stringify(bodyWithJobDetails));

    try {
      const response = await fetch(
        "https://fastapi-job-matcher-05-160893319817.europe-southwest1.run.app/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyWithJobDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const filteredJobs = data.jobs.filter(
        (job) => formatScoreAsPercentage(job.compatibility_score) > 10
      );
      console.log(filteredJobs);
      const timestamp = Date.now();
      localStorage.setItem("timestamp", timestamp);
      localStorage.setItem("jobs", JSON.stringify(filteredJobs));
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const formatScoreAsPercentage = (score) => {
    return score * 1000; // Convert to percentage and format as string
  };

  // UseEffect to fetch jobs once when component mounts
  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [jobs]); // Empty dependency array makes it run only once on mount


  const addUserData = async (userId, data) => {
    try {
      if (!userId) throw new Error("User ID is undefined");
      if (!data || typeof data !== "object") throw new Error("Invalid data");
      const snapshot = await get(ref(database, `users/${userId}`));
      if (snapshot.exists()) {
        console.log("User data already exists.");
        return;
      }
      const sanitizedData = JSON.parse(JSON.stringify(data)); // Remove undefined values
      const userRef = ref(database, `users/${userId}`);
      await set(userRef, sanitizedData); // Completely writes data for the first time
      console.log("User data successfully added.");
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  return (
    <div className="ml-2 mr-10">
      <div className="flex flex-col items-center max-w-7xl ml-0">
        <div className="flex flex-col lg:flex-row items-center lg:justify-end top-8 xl:ml-60 mlg:ml-20 w-[90%]">
          <p className="text-light-purple font-thin text-xs whitespace-nowrap"></p>
        </div>
      </div>

      {/* Top Filter Section */}
      <div className="w-full px-9">
        <div className="flex flex-col lg:flex-row items-center mb-4 mt-3 max-w-7xl gap-x-6 ml-10 w-[80%]">
          <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
            Daily jobs
          </h2>
        </div>

        {/* Job List Section */}
        <div className="flex flex-col justify-center items-center ml-10 bg-white rounded-xl w-full max-w-6xl h-[calc(79vh-70px)] overflow-y-auto p-4">
          <div className="w-full max-w-6xl">
            {jobs.length === 0 ? (
              <p className="text-dark-blue text-lg">
                Loading your daily jobs...
              </p>
            ) : (
              jobs.map((job, index) => (
                <div
                  key={index}
                  className={`h-[80px] w-full grid grid-cols-4 gap-4 ${
                    index !== jobs.length - 1
                      ? "border-b-2 border-pale-purple"
                      : ""
                  }`}
                >
                  {/* Job Title */}
                  <div className="col-span-1 flex items-center justify-center">
                    {job.company_logo && (
                      <img
                        src={job.company_logo}
                        alt="Company Logo"
                        className="h-8 w-8"
                      />
                    )}
                  </div>

                  <div className="col-span-2 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4">
                    <a
                      target="_blank"
                      href={job.job_url}
                      rel="noopener noreferrer"
                    >
                      <p className="text-dark-blue text-sm font-extrabold">
                        {job.title}
                      </p>
                    </a>
                    {/* Contract Type and Salary */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      <div className="bg-soft-liliac rounded-lg py-1 px-2 text-xs h-auto">
                        <span className="text-dark-purple">{job.company}</span>
                      </div>
                      <div className="bg-soft-liliac rounded-lg py-1 px-3 text-xs h-auto">
                        <span className="text-dark-purple">{job.site}</span>
                      </div>
                    </div>
                  </div>
                  {/* Company and Location */}
                  <div className="col-span-1 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4">
                    <a
                      target="_blank"
                      href={job.company_url}
                      rel="noopener noreferrer"
                    >
                      <p className="text-dark-blue text-xs font-extrabold">
                        {job.location}
                      </p>
                    </a>
                  </div>
                  <div className="col-span-1 flex flex-col text-xs justify-center border-r-2 border-dotted border-pale-purple my-4">
                    <div className="flex flex-wrap gap-1 mt-1"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
