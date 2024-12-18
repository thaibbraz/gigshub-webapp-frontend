import React, { useState, useEffect } from "react";
import ButtonAI from "../../Elements/ButtonAI.jsx";
import Select from 'react-select';
import countryList from "../../../static/countryList.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useResumeStore from "../../../stores/resume/resumeStore.js";
import Select from 'react-select';
import useJobsStore from "../../../stores/resume/jobsStore.js";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resume = useResumeStore((state) => state.resume);
  const jobs = useJobsStore((state) => state.jobs);
  const hasFetchedJobs = useRef(false);

  const [countries, setCountries] = useState([]);
  const [jobTitle, setJobTitle] = useState(resume?.title);
  const [locationState, setLocationState] = useState(resume?.country);
  const [loading, setLoading] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState([]);
  const [error, setError] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [status, setStatus] = useState({
    linkedin: false,
    glassdoor: false,
    indeed: false,
  });
  const formatScoreAsPercentage = (score) => Math.round(score * 100);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = countryList;
        const countryOptions = data.map((country) => ({
          value: country.value,
          label: country.name,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (location.state?.fetchJobsOnLoad && !hasFetchedJobs.current) {
      fetchJobs();
      hasFetchedJobs.current = true;
    }
  }, [location.state]);

  const fetchJobsFromSources = async (sources, searchTerm, location, resumeData) => {
    const jobLists = [];
    await Promise.all(
      sources.map(async (site) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_JOBS_URL}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              search_term: searchTerm,
              location,
              resume_data: resumeData,
              site_name: site,
            }),
          });

          if (!response.ok) throw new Error(`Failed to fetch jobs from ${site}`);

          const { jobs } = await response.json();
          jobLists.push({ site, list: jobs });
        } catch (error) {
          console.error(`Error fetching jobs from ${site}:`, error);
        } finally {
          setLoadingJobs((prevLoadingJobs) =>
            prevLoadingJobs.filter((source) => source !== site)
          );
        }
      })
    );

    return jobLists;
  };

  const fetchJobs = async () => {
    const { setJobs } = useJobsStore.getState();
    try {
      if (!jobTitle || !locationState) {
        return console.warn("You need to fill in your job title and location.");
      }
      const jobSources = ["indeed", "linkedin", "zip_recruiter", "glassdoor", "google"];
      setLoadingJobs(jobSources);
      const jobLists = await fetchJobsFromSources(jobSources, jobTitle, locationState, resume);
      const jobsData = {
        location: locationState,
        search_term: jobTitle,
        jobLists,
      };
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCustomCVClick = description => {
    console.log('description', description)
    navigate("/custom-cv", { state: { tailorResumeOnload:' description' } });
  };

  const messages = [
    "We're analysing your CV data. This process might take some time...",
    "We're checking the best opportunities on LinkedIn",
    "We're checking the best opportunities on Glassdoor",
    "We're checking the best opportunities on Indeed",
  ];
  useEffect(() => {
    if(!loading) return;

    setMessageIndex(0);
    setStatus({
      linkedin: false,
      glassdoor: false,
      indeed: false,
    });

    const timer = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if(nextIndex === 2) {
          setStatus((prev) => ({ ...prev, linkedin: true }));
        } else if(nextIndex === 3) {
          setStatus((prev) => ({ ...prev, glassdoor: true }));
        } else if(nextIndex === 4) {
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
        <div className="flex lg:flex-row mb-6 gap-x-6 justify-end border-b-[1px] border-gray-300 pb-6 mt-2">
          <div className="flex grow flex-col lg:flex-row lg:space-x-4 max-w-3xl">
            {/* Inputs */}
            <input
              className="grow border border-gray-300 rounded-1xl h-input px-4"
              label="Job Title"
              type="text"
              placeholder={"Software Engineer"}
              value={jobTitle}
              onChange={evt => setJobTitle(evt.target.value)}
            />
            <Select
                id="country"
                styles={{control: base => ({ ...base, minHeight: 40 })}}
                className="grow min-w-[200px]"
                options={countries || []}
                value={locationState || countries.find((option) => option.value === resume.country) || null}
                onChange={evt => setLocationState(evt.value)}
                placeholder={locationState}
              />
          </div>
          {/* Auto Apply Button */}
          <ButtonAI loading={loadingJobs.length} action={fetchJobs} text="Find me a job" />
        </div>
        {/* Job List Section */}
        {error && <p className="text-center text-red-500">{error}</p>}
        {loadingJobs.length > 0 && (
          <div className="flex flex-col items-center bg-white w-full">
            <div className="flex flex-col items-center justify-center space-y-6 mt-10">
              {/* Dynamic Message */}
              <h2 className="text-2xl font-semibold text-gray-700">
                {messages[messageIndex]}
              </h2>

              {/* Logos with loading/checks */}
              <div className="flex space-x-10 items-center">
                {/* LinkedIn */}
                <div className="flex flex-col items-center">
                  <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon.svg" alt="LinkedIn Logo" className="h-12 w-12 object-contain" />
                  <span className="mt-2 text-gray-500 text-sm">LinkedIn</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {!loadingJobs.includes('linkedin') ? (
                      <div className="text-green-500 text-xl font-bold">✔</div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                </div>

                {/* Glassdoor */}
                <div className="flex flex-col items-center">
                  <img src="https://static-00.iconduck.com/assets.00/glassdoor-icon-2048x2048-4di6xoda.png" alt="Glassdoor Logo" className="h-12 w-12 object-contain" />
                  <span className="mt-2 text-gray-500 text-sm">Glassdoor</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {!loadingJobs.includes('glassdoor') ? (
                      <div className="text-green-500 text-xl font-bold">✔</div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    )}
                  </div>
                </div>

                {/* Indeed */}
                <div className="flex flex-col items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz8Qi-G6jIHt6TmCOguWjOKGYYQPB1afpSQ&s" alt="Indeed Logo" className="h-12 w-12 object-contain" />
                  <span className="mt-2 text-gray-500 text-sm">Indeed</span>
                  <div className="mt-2 flex items-center space-x-2">
                    {!loadingJobs.includes('indeed') ? (
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
        {!loadingJobs.length && jobs && (
          <div className="flex flex-col items-center bg-white rounded-xl w-full overflow-y-auto">
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
                  {jobs?.jobLists.map((group, index) => {
                    let logo;
                    if(group.site === "indeed") {
                      logo =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThz8Qi-G6jIHt6TmCOguWjOKGYYQPB1afpSQ&s";
                    } else if(group.site === "glassdoor") {
                      logo = "https://static-00.iconduck.com/assets.00/glassdoor-icon-2048x2048-4di6xoda.png";
                    } else if(group.site === "linkedin") {
                      logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoJ9_vWWlqK9M-lPZGNIl6UQTJhAMR78eZpQ&s";
                    } else if(group.site === "google") {
                      logo = "https://img.icons8.com/?size=512&id=17949&format=png";
                    } else if(group.site === "zip_recruiter") {
                      logo = "https://play-lh.googleusercontent.com/Z2MTVQ1XP6rIgBusW8ebjDWASv40-H4TxUEl5FaCN78gt_goEZwrlDjo25tGDc8Oe9s";
                    }
                    return group?.list.length > 0 && group?.list.map((job, index) => {
                      return (    
                        <tr key={index} className="border-b hover:bg-gray-50 transition duration-150">
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-3">
                              <img src={logo} alt={`${job.site} logo`} className="h-8 w-8 rounded-full object-cover" />
                              <div>
                                <a href={job.job_url} target="_blank" rel="noreferrer">
                                  <h3 className="text-gray-800 font-semibold hover:underline">
                                    {job.title}
                                  </h3>
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-sm">
                            <p className="text-gray-800 font-medium">
                              {job.company}
                            </p>
                            <p className="text-sm text-gray-500">
                              {job.location}
                            </p>
                          </td>
                          <td className="py-8 px-4 text-nowrap">
                            <p className="text-sm text-gray-500">
                              {job.date_posted}
                            </p>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex flex-nowrap text-nowrap text-xs font-bold items-center">
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${job.is_remote ? "bg-green-500" : "bg-blue-500"}`}></span>
                              {job.is_remote ? "Remote" : "In-person"}
                            </div>
                          </td>
                          <td className="py-2 px-3">
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
                          <td className="py-2 px-3">
                            <div className="flex gap-1">
                              <a href={job.job_url} target="_blank" rel="noreferrer" className="bg-purple text-white text-xs font-medium me-2 py-2 w-full flex text-nowrap px-3 justify-center rounded">
                                Apply
                              </a>
                              {job.description && (
                                <button className="border-[1px] border-purple text-purple text-xs font-medium py-2 w-full flex text-nowrap px-3 justify-center rounded" onClick={() => handleCustomCVClick(job.jobDescription)}>
                                  Increase compatibility
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
