import React from "react";
import starsUnfilled from "../../assets/starsUnfilled.svg";

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

  const dailyLimitMargin = "ml-2";

  return (
    <div className="ml-24">
      <div className="absolute top-8 left-[1225px] px-10 mx-20">
        <a
          href="/logout"
          className="text-light-purple font-thin hover:underline whitespace-nowrap"
        >
          Log out
        </a>
      </div>

      {/* Top Filter Section */}
      <div className="flex items-center mb-4 mt-6 w-full max-w-7xl gap-x-6 ml-10">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">
              Salary Expectation
            </label>
            <input
              type="text"
              placeholder="Salary expectation"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light-liliac text-sm mb-2">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-300 rounded-2xl h-input py-3 px-4"
            />
          </div>
        </div>

        <button className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6 ml-10">
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
        <p className="text-light-purple text-xs font-thin mt-6 ml-52">
          Daily limit: <span className="font-bold text-lg">26/100</span>
        </p>
      </div>

      {/* Job List Section */}
      <div className="flex flex-col items-center  ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)]">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="h-[112px] w-[1200px] border-b-2 border-pale-purple grid grid-cols-4"
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
    </div>
  );
};

export default Dashboard;
