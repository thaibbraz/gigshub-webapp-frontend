import React, { useState, useEffect } from "react";
import Input from "../../Elements/Input.jsx";
import ButtonAI from "../../Elements/ButtonAI.jsx";
import { addUserData, getUserCVData } from "../../../utils/firebase.js";
import { sendJobsRequest } from "../../../utils/api.js";
import Error from "../../Error/Error.jsx";

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

  const handleClick = () => {
    !clicked ? setClicked(true) : fetchJobs();
  };

  // Fetch and store jobs
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const cv = localStorage.getItem("cv");
    const userId = user?.uid;

    if (!user || !cv) {
      try {
        const newUserData = {
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
    if (Object.keys(cvFormData).length === 0) {
      console.error("cvFormData is missing");
      const data = await getUserCVData(userId);
      setcvFormData(data);
    }
    if (!jobTitle && cvFormData) {
      const cvJobTitle = cvFormData.jobTitle;
      setJobTitle(cvJobTitle);
    }
    if (!location && cvFormData) {
      const cvLocation = cvFormData.location;
      setLocation(cvLocation);
    }

    try {
      const data = await sendJobsRequest({
        search_term: jobTitle,
        location: location,
        resume_data: cvFormData,
      });
      const filteredJobs = data.jobs.filter(
        (job) => formatScoreAsPercentage(job.compatibility_score) > 10
      );

      // Update localStorage and state
      localStorage.setItem("timestamp", Date.now());
      localStorage.setItem("jobs", JSON.stringify(data));

      filteredJobs.length && setJobs(filteredJobs);
    } catch (error) {
      if (
        error.message ===
        "Job matching limited to 3 searches per day. Please upgrade to be matched with more jobs."
      ) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on mount
  useEffect(() => {
    if (jobs.length === 0) fetchJobs();
  }, [cvFormData, jobTitle, location]);

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
          <ButtonAI
            loading={loading}
            action={handleClick}
            text="Find me a job"
          />

          {/* Daily Limit */}
          <p className="text-light-purple text-xs font-thin mt-6 xl:ml-60 mlg:ml-20"></p>
        </div>

        {/* Job List Section */}
        <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto overflow-x-auto">
          <div className="w-full px-9">
            {error && (
              <p className="text-center text-red-500">
                <Error message={error} />
              </p>
            )}
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
                  <p className="text-dark-blue text-lg font-extrabold hidden sm:block">
                    {job.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Contract Type Label */}
                    <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto hidden sm:flex">
                      <span className="text-xs text-dark-purple">
                        {job.contractType}
                      </span>
                    </div>
                    {/* Salary Label */}
                    <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto hidden sm:flex">
                      <span className="text-xs text-dark-purple">
                        {job.salary}
                      </span>
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
                    {job.company}
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
                  <p className="text-dark-blue font-thin">{job.appliedDate}</p>
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
