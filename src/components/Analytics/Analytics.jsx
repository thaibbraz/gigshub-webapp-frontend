import React from "react";
import filterIcon from "../../assets/filterIcon.svg";

const Analytics = () => {
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
  ];

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

      {/* Job List Section */}

      <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto">
        <div className="border-2 border-pale-purple mt-10 rounded-xl">
          <div className="flex justify-between items-center my-10 mx-10">
            <p className="text-dark-blue text-2xl font-extrabold">
              Job applied to
            </p>
            <img
              src={filterIcon}
              alt="Filter Icon"
              className="h-6 w-6 cursor-pointer"
            />
          </div>
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
                    <span className="text-xs text-dark-purple">
                      {job.salary}
                    </span>
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
        <div className="grid grid-cols-2 gap-8 mt-10 w-full px-9 pb-9 h-full">
          <div className="border-2 border-pale-purple rounded-xl">
            <p className="my-10 mx-10 text-dark-blue text-2xl font-extrabold">
              Graph Title
            </p>
          </div>
          <div className="border-2 border-pale-purple rounded-xl">
            <p className="my-10 mx-10 text-dark-blue text-2xl font-extrabold">
              Graph Title
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
