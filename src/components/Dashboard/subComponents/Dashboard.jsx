import React from "react";
import starsUnfilled from "../../../assets/starsUnfilled.svg";

const Dashboard = () => {
  const jobs = [
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "AIRBNB",
      location: "Barcelona, Spain",
      appliedDate: "04/09/2024, 20:04",
    },
  ];

  return (
    <div className="ml-2">
      <div className="absolute top-8 left-[1179px] px-10 mx-20">
        <p className="text-light-purple font-thin text-xs whitespace-nowrap">
          Daily Limit: <span className="font-bold text-lg ">0/100</span>
        </p>
      </div>
      {/* Top Filter Section */}
      <div className="flex items-center mb-4 mt-6 w-full max-w-7xl gap-x-6 ml-10">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2 ">Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Salary Expectation
            </label>
            <input
              type="text"
              placeholder="Salary expectation"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4 shadow dark-blue"
            />
          </div>
        </div>

        <button
          style={{ marginLeft: "28rem" }}
          className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6"
        >
          <div className="flex items-center justify-center w-40 h-input bg-dark-blue rounded-2xl border-5 px-6">
            <img
              src={starsUnfilled}
              alt="Stars Icon"
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm text-white font-thin py-6">
              Auto Apply
            </span>
          </div>
        </button>
      </div>
      {/* Job List Section */}
      <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(65vh-28px)] overflow-y-auto">
        {jobs.map((job, index) => (
          <div
            key={index}
            className={`h-[112px] w-[1200px] grid grid-cols-4 ${
              index !== jobs.length - 1 ? "border-b-2 border-pale-purple" : ""
            }`}
          >
            {/* Job Title */}
            <div className="col-span-2 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
              <p className="text-dark-blue text-lg font-extrabold">
                {job.title}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Contract Type Label */}
                <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto">
                  <span className="text-xs text-dark-purple">
                    {job.contractType}
                  </span>
                </div>
                {/* Salary Label */}
                <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto">
                  <span className="text-xs text-dark-purple">{job.salary}</span>
                </div>
              </div>
            </div>

            {/* Company and Location */}
            <div className="col-span-1 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
              <p className="text-lg font-extrabold text-dark-blue">
                {job.company}
              </p>
              <p className="text-dark-blue font-thin">{job.location}</p>
            </div>

            {/* Applied Date */}
            <div className="col-span-1 flex items-center ml-10">
              <p className="text-dark-blue font-thin">{job.appliedDate}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-7xl ml-10 h-banner mt-4 bg-custom-gradient flex items-center">
        <button className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-white ml-auto mr-10">
          <div className="flex items-center justify-center w-40 h-input bg-white rounded-2xl border-5 px-6">
            <span className="text-sm font-thin py-6 text-dark-blue">
              Sign up for free
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
