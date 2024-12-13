import React, { useState, useEffect } from "react";
import Input from "../../Elements/Input.jsx";
import ButtonAI from "../../Elements/ButtonAI.jsx";
import { addUserData, checkUserExists, getUserCVData } from "../../../utils/firebase.js";

const UserDashboard = ({ formData }) => {
  const [jobs, setJobs] = useState(
    localStorage.getItem("jobs")
      ? JSON.parse(localStorage.getItem("jobs")).jobs
      : []
  );
  const [jobTitle, setJobTitle] = useState(formData.jobTitle);
  const [location, setLocation] = useState(formData.location);
  const [cvFormData, setcvFormData] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);

  // Utility to format compatibility score
  const formatScoreAsPercentage = (score) => score * 1000;

  // Fetch and store jobs
  const fetchData = async () => {
    console.log("Fetching jobs...");
    setClicked(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const cv = localStorage.getItem("cv");
    const userId = user?.uid;
    console.log("user id", userId);
    console.log("cvFormData", cvFormData);

    if (checkUserExists(userId)) {
      try {
        const newUserData = {
          uid: userId,
          email: user?.email || "",
          displayName: user?.displayName || "",
          photoURL: user?.photoURL || "",
          cv: cvFormData,
        };
        localStorage.setItem("user", JSON.stringify(newUserData));
        localStorage.setItem("cv", JSON.stringify(cvFormData));
        await addUserData(userId, newUserData);
      } catch (error) {
        console.error("Error submitting form: ", error);
      }
    }
    if (!cvFormData || Object.keys(cvFormData).length === 0) {
      console.error("cvFormData is missing");
      const data = await getUserCVData(userId);
      setcvFormData(data);
    }
    if (!jobTitle && cvFormData) {
      const jobTittle = cvFormData.jobTitle;
      setJobTitle(jobTittle);
    }
    if (!location && cvFormData) {
      const location = cvFormData.location;
      setLocation(location);
    }
    
  };
  const fetchJobs = async (job) => {
    // Check localStorage for cached jobs
    try {
      const cachedJobs = localStorage.getItem("jobs");
      const timestamp = localStorage.getItem("timestamp");

      if (
        JSON.parse(cachedJobs)?.length > 0 &&
        jobs.length === 0 &&
        Date.now() - timestamp < 86400000
      ) {
        setJobs(JSON.parse(cachedJobs));
        return;
      } else if (!JSON.parse(cachedJobs)) {
        const response = await fetch(
           "https://fastapi-job-matcher-05-160893319817.europe-southwest1.run.app/jobs",
          //"http://127.0.0.1:8001/api/jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              search_term: jobTitle,
              location: location,
              resume_data: cvFormData,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs from API");
        }

        const data = await response.json();
        const filteredJobs = data.jobs.filter(
          (job) => formatScoreAsPercentage(job.compatibility_score) > 10
        );
        const orderJobByDate = filteredJobs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Update localStorage and state
        localStorage.setItem("timestamp", Date.now());
        localStorage.setItem("jobs", JSON.stringify(data));
        console.log("got here", orderJobByDate);

        setJobs(orderJobByDate);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }
  // Fetch jobs on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ml-2 mr-10">
      {/* Top Filter Section */}
      <div className="w-full px-9">
        <div className="flex flex-col lg:flex-row items-center mb-4 mt-6 max-w-7xl gap-x-6 ml-10 w-[90%]">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Inputs */}
            <Input
              label="Job Title"
              type="text"
              placeholder={jobTitle || "Job Title"}
              handleChange={setJobTitle}
            />
            <Input
              label="Location"
              type="text"
              placeholder={location || "Location"}
              handleChange={setLocation}
            />
          </div>

          {/* Auto Apply Button */}
          <ButtonAI loading={loading} action={fetchJobs} text="Find me a job" />

          {/* Daily Limit */}
          <p className="text-light-purple text-xs font-thin mt-6 xl:ml-60 mlg:ml-20"></p>
        </div>

        {/* Job List Section */}
        <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto overflow-x-auto">
          <div className="w-full px-9">
            {error && <p className="text-center text-red-500">{error}</p>}
            {loading && (
              <p className="text-center text-gray-500">Loading jobs...</p>
            )}
            {((jobs.length === 0 && !loading) || !clicked) && (
              <div className="flex flex-col items-center justify-center h-[calc(90vh-28px)]">
                <h1 className="text-4xl font-semibold text-gray-800 mb-8">
                  Hey there, ready to apply?
                </h1>
                <div className="flex space-x-6">
                  {/* Practice Option */}
                  <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center w-64">
                    <div className="flex justify-center mb-4">
                      {/* Icon placeholder - replace with your SVG or image */}
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Practice icon"
                        className="h-20 w-20"
                      />
                    </div>
                    <h2 className="text-xl font-medium text-gray-700 mb-4">
                      I want to practice
                    </h2>
                    <button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full border border-purple-300 hover:bg-purple-100">
                      Start a 1 minute demo
                    </button>
                  </div>

                  {/* Explore Option */}
                  <div className="bg-purple-50 p-6 rounded-lg shadow-lg text-center w-64">
                    <div className="flex justify-center mb-4">
                      {/* Icon placeholder - replace with your SVG or image */}
                      <img
                        src="https://via.placeholder.com/100"
                        alt="Explore icon"
                        className="h-20 w-20"
                      />
                    </div>
                    <h2 className="text-xl font-medium text-gray-700 mb-4">
                      I’ll explore on my own
                    </h2>
                    <button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full border border-purple-300 hover:bg-purple-100">
                      Start applying
                    </button>
                  </div>
                </div>
              </div>
            )}
            {jobs.map((job, index) => (
              <div
                key={index}
                className={`h-[112px] w-full md:w-[900px] lg:w-[1200px] grid grid-cols-4 ${
                  index !== jobs.length - 1
                    ? "border-b-2 border-pale-purple"
                    : ""
                }`}
              >
                {/* Job Title */}
                <div className="col-span-2 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
                  <p className="text-dark-blue text-lg font-extrabold sm:hidden">
                    {job.title.length > 8
                      ? `${job.title.slice(0, 8)}...`
                      : job.title}
                  </p>
                  <div className="flex">
                    <p className="text-dark-blue text-lg font-extrabold hidden sm:block">
                      <a
                        href={
                          job.job_url_direct ? job.job_url_direct : job.job_url
                        }
                        rel="noreferrer"
                        target="_blank"
                      >
                        {job.title}
                      </a>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Contract Type Label */}
                    <div className="bg-dark-blue rounded-lg py-1 px-3 text-sm h-auto hidden sm:flex">
                      <a
                        href={
                          job.job_url_direct ? job.job_url_direct : job.job_url
                        }
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span className="text-xs text-soft-liliac">Apply</span>
                      </a>
                    </div>
                    {/* Salary Label */}
                    <div className="bg-dark-blue rounded-lg py-1 px-3 text-sm h-auto hidden sm:flex">
                      <a
                        href={
                          job.job_url_direct ? job.job_url_direct : job.job_url
                        }
                        rel="noreferrer"
                        target="_blank"
                      >
                        {" "}
                        <span className="text-xs text-soft-liliac">
                          Custom CV for this job
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Company and Location */}
                <div className="col-span-1 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
                  <p className="text-lg font-extrabold text-dark-blue sm:hidden">
                    {job.company.length > 8
                      ? `${job.company.slice(0, 8)}...`
                      : job.company}
                  </p>
                  <p className="text-lg font-extrabold text-dark-blue hidden sm:block">
                    {job.company}{" "}
                    <span className="text-xs text-dark-purple">
                      {job.is_remote}
                    </span>
                  </p>
                  <p className="text-lg font-thin text-dark-blue sm:hidden">
                    {job.location.length > 10
                      ? `${job.location.slice(0, 10)}...`
                      : job.location}
                  </p>
                  <p className="text-lg font-thin text-dark-blue hidden sm:block">
                    {job.location}
                  </p>
                </div>

                {/* Applied Date */}
                <div className="col-span-1 flex items-center ml-10 my-4 hidden sm:flex">
                  <p className="text-dark-blue font-thin">{job.date_posted}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
