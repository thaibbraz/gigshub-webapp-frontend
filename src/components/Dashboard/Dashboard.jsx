import React from "react";
import starsUnfilled from "../../assets/starsUnfilled.svg";

const Dashboard = () => {
  const jobs = [
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$40,000",
      company: "ORBITECH",
      location: "Bremen, Germany",
      appliedDate: "04/09/2024, 20:04",
    },
    // Add more jobs similarly
  ];

  return (
    <div>
      <div className="absolute top-8 left-[1225px] px-10 mx-20">
        <a
          href="/logout"
          className="text-light-purple font-thin hover:underline"
        >
          Log out
        </a>
      </div>

      {/* Top Filter Section */}
      <div className="flex justify-between items-center mb-4 mt-6 ml-24 w-full max-w-7xl">
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

        <button className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6">
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
        <p className="text-light-purple text-xs font-thin mt-6">
          Daily limit: <span className="font-bold text-lg">26/100</span>
        </p>
      </div>

      {/* Job List Section */}
      <div className="flex flex-col bg-white rounded-xl p-10 ml-24 pl-4 w-full max-w-7xl h-[calc(100vh-28px)]">
        {/* Add your job list rendering logic here */}
      </div>
    </div>
  );
};

export default Dashboard;
