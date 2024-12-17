import React, { useState, useEffect } from "react";
import ButtonAI from "../../Elements/ButtonAI.jsx";
import CountryDropdown from "../../Dropdown/CountryDropdown.jsx";
import countryList from "../../../static/countryList.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { checkUserExists, getUserCVData } from "../../../utils/firebase.js";
import useResumeStore from "../../../stores/resume/resumeStore.js";

const UserDashboard = () => {
  const navigate = useNavigate();
  const resume = useResumeStore((state) => state.resume);
  // TODO: Fix the job title and location
  const [jobTitle, setJobTitle] = useState(resume?.title);
  const [location, setLocation] = useState("San Francisco");
  const [cvFormData, setcvFormData] = useState(resume);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [status, setStatus] = useState({
    linkedin: false,
    glassdoor: false,
    indeed: false,
  });
  const [jobs, setJobs] = useState(
    localStorage.getItem("jobs")
      ? JSON.parse(localStorage.getItem("jobs")).jobs
      : []
  );
  const formatScoreAsPercentage = (score) => Math.round(score * 100);

  const fetchData = async () => {
    setClicked(true);

    const hasFetchedJobs = localStorage.getItem("hasFetchedJobs");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
    if (!checkUserExists(userId)) {
      navigate("/resume/edit");
    }

    if (!hasFetchedJobs) {
      fetchJobs().then(() => {
        localStorage.setItem("hasFetchedJobs", "true");
      });
    }
  };
  const fetchJobsFromSources = async (
    sources,
    searchTerm,
    location,
    resumeData
  ) => {
    const allJobs = [];
    const failedSources = [];

    for (const site of sources) {
      try {
        const response = await fetch(`${process.env.REACT_APP_JOBS_URL}/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search_term: searchTerm,
            location: location,
            resume_data: resumeData,
            site_name: site,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs from ${site}`);
        }

        const data = await response.json();
        allJobs.push(...data.jobs);
      } catch (error) {
        console.error(`Error fetching jobs from ${site}:`, error);
        failedSources.push(site);
      }
    }

    return { allJobs, failedSources };
  };

  const fetchJobs = async () => {
    try {
      const cachedJobs = localStorage.getItem("jobs");
      const timestamp = localStorage.getItem("timestamp");
      if (
        JSON.parse(cachedJobs)?.length > 0 &&
        Date.now() - timestamp < 86400000
      ) {
        setJobs(JSON.parse(cachedJobs));
        return;
      } else if (!JSON.parse(cachedJobs)) {
        setLoading(true);
        if (!jobTitle || !location) {
          toast.warn("You need to fill in your job title and location.");
          return;
        }
        const jobSources = [
          "indeed",
          "linkedin",
          "zip_recruiter",
          "glassdoor",
          "google",
        ];
        const { allJobs, failedSources } = await fetchJobsFromSources(
          jobSources,
          jobTitle,
          location,
          resume
        );
        const filteredJobs = allJobs.filter(
          (job) => formatScoreAsPercentage(job.compatibility_score) > 10
        );
        const orderedJobs = filteredJobs.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        console.log("Filtered and ordered jobs:", orderedJobs);
        console.log("Failed sources:", failedSources);
        // Update localStorage and state
        localStorage.setItem("timestamp", Date.now());
        // JSON.stringify(orderedJobs));
        setJobs(orderedJobs);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const handleCustomCVClick = (jobDescription) => {
    localStorage.setItem("boardJobDescription", jobDescription);
    navigate("/custom-cv");
  };

  // Fetch jobs on mount
  useEffect(() => {
    fetchData();
  }, []);

  const messages = [
    "We're analysing your CV data. This process might take some time...",
    "We're checking the best opportunities on LinkedIn",
    "We're checking the best opportunities on Glassdoor",
    "We're checking the best opportunities on Indeed",
  ];
  useEffect(() => {
    if (!loading) return;

    setMessageIndex(0);
    setStatus({
      linkedin: false,
      glassdoor: false,
      indeed: false,
    });

    const timer = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex === 2) {
          setStatus((prev) => ({ ...prev, linkedin: true }));
        } else if (nextIndex === 3) {
          setStatus((prev) => ({ ...prev, glassdoor: true }));
        } else if (nextIndex === 4) {
          setStatus((prev) => ({ ...prev, indeed: true }));
          clearInterval(timer);
        }

        return nextIndex;
      });
    }, 6000); // 5000ms = 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [loading]);

  return (
    <div className="ml-2 mr-10">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Top Filter Section */}
      <div className="w-full px-9">
        <div className="flex lg:flex-row mb-4 mt-6 max-w-7xl gap-x-6 ml-10 w-[90%]">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Inputs */}
            <input
              className="border border-gray-300 rounded-1xl h-input px-4"
              label="Job Title"
              type="text"
              placeholder={"Software Engineer"}
              value={jobTitle}
              onChange={evt => setJobTitle(evt.target.value)}
            />
            <CountryDropdown
              options={countryList}
              fieldName="location"
              defaultValue={location || "Location"}
              handleChange={setLocation}
            />
          </div>

          {/* Auto Apply Button */}
          <ButtonAI loading={loading} action={fetchJobs} text="Find me a job" />
        </div>
        {/* Job List Section */}
        {error && <p className="text-center text-red-500">{error}</p>}
        {loading && (
          <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-6 mt-10">
              {/* Dynamic Message */}
              <h2 className="text-2xl font-semibold text-gray-700">
                {messages[messageIndex]}
              </h2>

              {/* Logos with loading/checks */}
              <div className="flex space-x-10 items-center">
                {/* LinkedIn */}
                <div className="flex flex-col items-center">
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/linkedin-icon.svg"
                    alt="LinkedIn Logo"
                    className="h-12 w-12 object-contain"
                  />
                  <span className="mt-2 text-gray-500 text-sm">LinkedIn</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {status.linkedin ? (
                      <div className="text-green-500 text-xl font-bold">✔</div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                </div>

                {/* Glassdoor */}
                <div className="flex flex-col items-center">
                  <img
                    src="https://static-00.iconduck.com/assets.00/glassdoor-icon-2048x2048-4di6xoda.png"
                    alt="Glassdoor Logo"
                    className="h-12 w-12 object-contain"
                  />
                  <span className="mt-2 text-gray-500 text-sm">Glassdoor</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {status.glassdoor ? (
                      <div className="text-green-500 text-xl font-bold">✔</div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                </div>

                {/* Indeed */}
                <div className="flex flex-col items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz8Qi-G6jIHt6TmCOguWjOKGYYQPB1afpSQ&s"
                    alt="Indeed Logo"
                    className="h-12 w-12 object-contain"
                  />
                  <span className="mt-2 text-gray-500 text-sm">Indeed</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {status.indeed ? (
                      <div className="text-green-500 text-xl font-bold">✔</div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Job List */}
        {!loading && jobs?.length > 0 && (
          <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-6xl overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Job
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Company
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Remote
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      compatibility
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => {
                    let logo;
                    if (job.site === "indeed") {
                      logo =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz8Qi-G6jIHt6TmCOguWjOKGYYQPB1afpSQ&s";
                    } else if (job.site === "glassdoor") {
                      logo =
                        "https://static-00.iconduck.com/assets.00/glassdoor-icon-2048x2048-4di6xoda.png";
                    } else if (job.site === "linkedin") {
                      logo =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoJ9_vWWlqK9M-lPZGNIl6UQTJhAMR78eZpQ&s";
                    }

                    return (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition duration-150"
                      >
                        <td className="py-3 px-4 flex items-center space-x-3">
                          <img
                            src={logo}
                            alt={`${job.site} logo`}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div>
                            <a
                              href={job.job_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <h3 className="text-gray-800 font-semibold hover:underline">
                                {job.title}
                              </h3>
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-800 font-medium">
                            {job.company}
                          </p>
                          <p className="text-sm text-gray-500">
                            {job.location}
                          </p>
                        </td>{" "}
                        <td className="py-8 px-4">
                          <p className="text-sm text-gray-500">
                            {job.date_posted}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              job.is_remote ? "bg-green-500" : "bg-blue-500"
                            }`}
                          ></span>
                          {job.is_remote ? "Remote" : "In-person"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <div
                              className={`relative w-10 h-10 rounded-full flex items-center justify-center text-gray-800 text-xs border-4 ${
                                formatScoreAsPercentage(
                                  job.compatibility_score
                                ) > 50
                                  ? "border-green-500 shadow-green-500/50 shadow-md"
                                  : formatScoreAsPercentage(
                                      job.compatibility_score
                                    ) > 15
                                  ? "border-yellow-500 shadow-yellow-500/50 shadow-md"
                                  : "border-red-500 shadow-red-500/50 shadow-md"
                              }`}
                            >
                              {formatScoreAsPercentage(job.compatibility_score)}
                              %
                            </div>
                          </div>
                        </td>
                        <td className="flex py-3 px-4">
                          <a
                            href={job.job_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" "}
                            <button className="bg-[#3F33C0]  text-white text-xs font-medium me-2 px-5 py-0.5 mr-2 rounded">
                              Apply
                            </button>
                          </a>

                          <button
                            className="bg-[#3F33C0] text-white text-xs font-medium  px-5 py-0.5 ml-2 rounded"
                            onClick={() => handleCustomCVClick(job.description)}
                          >
                            Increase compatibility
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
