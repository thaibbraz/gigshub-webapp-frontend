import React, { useState, useEffect } from "react";
import starsUnfilled from "../../../assets/starsUnfilled.svg";
import { addUserData } from "../../../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = ({ formData }) => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState(formData.jobTitle);
  const [location, setLocation] = useState(formData.location);
  const [cvFormData, setcvFormData] = useState(formData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Utility to format compatibility score
  const formatScoreAsPercentage = (score) => score * 1000;

  // Fetch and store jobs
  const fetchJobs = async () => {
    console.log("Fetching jobs...");
    
    if (!cvFormData || !jobTitle || !location) {
      console.error("Missing required fields: cvFormData, jobTitle, or location");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
   
    

    try {
      const newUserData = {
        email: user?.email || "",
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        cv: cvFormData,
      };
      await addUserData(userId, newUserData);
    } catch (error) {
      console.error("Error submitting form: ", error);
    } 

    // Check localStorage for cached jobs
    try {
      const cachedJobs = localStorage.getItem("jobs");
      const timestamp = localStorage.getItem("timestamp");

      if (JSON.parse(cachedJobs)?.length > 0 && Date.now() - timestamp < 86400000) {
        setJobs(JSON.parse(cachedJobs));
        console.log("Already had job cached", cachedJobs);
        return;
      }

      // Fetch new jobs from API
      // https://fastapi-job-matcher-05-160893319817.europe-southwest1.run.app
      // http://localhost:8080/api/jobs
      const response = await axios.post("https://fastapi-job-matcher-05-160893319817.europe-southwest1.run.app/api/jobs", {
        search_term: jobTitle,
        location: location,
        resume_data: cvFormData,
        results_wanted: 20,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs from API");
      }

      const data = await response.json();
      const filteredJobs = data.jobs.filter(
        (job) => formatScoreAsPercentage(job.compatibility_score) > 10
      );

      // Update localStorage and state
      localStorage.setItem("timestamp", Date.now());
      localStorage.setItem("jobs", JSON.stringify(data));
      console.log("got here", filteredJobs);
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch jobs on mount
  useEffect(() => {
    if (jobs.length === 0) fetchJobs();
  }, [cvFormData, jobTitle, location]);

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
        <div className="flex flex-col justify-center items-center ml-10 bg-white rounded-xl w-full max-w-6xl h-[calc(81vh-70px)] overflow-y-auto p-4">
          <div className="w-full max-w-6xl">
            {loading ? (
              <p className="text-dark-blue text-lg">Loading your daily jobs...</p>
            )  : (
              jobs && jobs.map((job, index) => (
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

                  {/* Job Details */}
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
                    <div className="flex flex-wrap gap-1 mt-1">
                      <div className="bg-soft-liliac rounded-lg py-1 px-2 text-xs">
                        <span className="text-dark-purple">{job.company}</span>
                      </div>
                      <div className="bg-soft-liliac rounded-lg py-1 px-3 text-xs">
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
