import React, { useState } from "react";
import starsUnfilled from "../../../assets/starsUnfilled.svg";

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("software engineer");
  const [location, setLocation] = useState("Spain");

  // Function to fetch job data
  const fetchJobs = async () => {
    const requestBody = {
      "first name": "Thainá",
      "last name": "Braz",
      email: "thainabraz@gmail.com",
      phone: "+34611322956",
      linkedin: "",
      github: "https://github.com/thainabraz",
      website: "",
      ethnicity: "",
      gender: "",
      lgbtq: "",
      authorization: "",
      sponsorship: "",
      address: "Barcelona",
      city: "Barcelona",
      state: "",
      zip: "",
      experiences: [
        {
          title: "Full Stack Developer/Teacher Assistant",
          date: "Sep/2020 - Feb/2022",
          company: "CodeOp",
          location: "Barcelona",
          description:
            "Helped over 100 students to improve their tech skills...",
        },
        {
          title: "Technical Manager",
          date: "Feb/2022 - Present",
          company: "CodeOp",
          location: "Barcelona",
          description:
            "Ensuring smooth class development by managing technical tools...",
        },
      ],
      education: [
        {
          degree: "BS Computer Science and Engineering",
          date: "",
          institution: "Polytechnic of Leiria",
        },
      ],
      skills: [
        {
          list: [
            "Python",
            "NodeJS",
            "Java",
            "JavaScript",
            "React",
            "SQL",
            "Tailwind",
            "Firebase",
            "AWS",
          ],
        },
      ],
      languages: [
        {
          language: "",
          level: "",
        },
      ],
      projects: [
        "Authentication with Rate limiters (Backend) NodeJS and Redis...",
        "Reporting Script (Backend) Python and Firebase...",
        "LMS Admin platform (Full stack) React, JavaScript, MySQL...",
      ],
    };

    // Add jobTitle and location to the request body
    const bodyWithJobDetails = { ...requestBody, jobTitle, location };

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
      // Filter out jobs with 0 compatibility score
      const filteredJobs = data.jobs.filter(
        (job) => formatScoreAsPercentage(job.compatibility_score) > 10
      );
      // Set the filtered jobs to state
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };
  const formatScoreAsPercentage = (score) => {
    return `${(score * 1000).toFixed(0)}%`; // Convert to percentage and format as string
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
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Job Title Input */}
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Job Title"
                className="border border-gray-300 rounded-2xl h-input py-2 px-3 shadow dark-blue text-xs"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            {/* Location Input */}
            <div className="flex flex-col mt-4 lg:mt-0">
              <label className="text-light-liliac text-sm mb-2">Location</label>
              <input
                type="text"
                placeholder="Location"
                className="border border-gray-300 rounded-2xl h-input py-2 px-3 shadow dark-blue text-xs"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Auto Apply Button */}
          <button
            className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6 lg:mt-0 lg:-mb-5 ml-0 xl:ml-[400px]"
            onClick={fetchJobs} // Call fetchJobs when button is clicked
          >
            <div className="flex items-center justify-center w-40 h-input bg-dark-blue rounded-2xl border-5">
              <img
                src={starsUnfilled}
                alt="Stars Icon"
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm text-white font-thin py-6">Search</span>
            </div>
          </button>
        </div>

        {/* Job List Section */}
        <div className="flex flex-col justify-center items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(69vh-28px)] overflow-y-auto p-4">
          <div className="w-full max-w-6xl">
            {jobs.length === 0 ? (
              <p className="text-dark-blue text-lg">No jobs available</p>
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
                        <span className="text-dark-purple">{job.location}</span>
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
                        {job.date_posted}
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
