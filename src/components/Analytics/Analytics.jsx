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
      title: "Full Stack Developer",
      contractType: "Permanent contract",
      salary: "$55,000",
      company: "SPOTIFY",
      location: "Stockholm, Sweden",
      appliedDate: "02/09/2024, 09:30",
    },
    {
      title: "Mobile App Developer (iOS)",
      contractType: "Permanent contract",
      salary: "$50,000",
      company: "N26",
      location: "Berlin, Germany",
      appliedDate: "02/09/2024, 09:10",
    },
    {
      title: "Front-end developer",
      contractType: "Permanent contract",
      salary: "$45,000",
      company: "TYPEFORM",
      location: "Barcelona, Spain",
      appliedDate: "02/09/2024, 15:00",
    },
  ];

  return (
    // Main Container
    <div className="ml-2 mr-10">
      {/* Jobs Applied Section */}
      <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto">
        <div className="w-full px-9">
          <div className="border-2 border-pale-purple mt-10 rounded-xl">
            <div className="flex justify-between items-center my-10 mx-10">
              <p className="text-dark-blue text-2xl font-extrabold">
                Jobs applied to
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
                className={`h-[112px] w-full md:w-[1000px] lg:w-[1200px] grid grid-cols-4 ${
                  index !== jobs.length - 1
                    ? "border-b-2 border-pale-purple"
                    : ""
                }`}
              >
                {/* Job Title */}
                <div className="col-span-2 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
                  <p className="text-lg font-extrabold text-dark-blue sm:hidden">
                    {job.title.length > 8
                      ? `${job.title.slice(0, 8)}...`
                      : job.title}
                  </p>
                  <p className="text-lg font-extrabold text-dark-blue hidden sm:block">
                    {job.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto hidden sm:flex">
                      <span className="text-xs text-dark-purple">
                        {job.contractType}
                      </span>
                    </div>

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
                    {job.company.length > 4
                      ? `${job.company.slice(0, 4)}...`
                      : job.company}
                  </p>
                  <p className="text-lg font-extrabold text-dark-blue hidden sm:block">
                    {job.company}
                  </p>
                  <p className="text-lg font-thin text-dark-blue sm:hidden">
                    {job.location.length > 8
                      ? `${job.location.slice(0, 8)}...`
                      : job.location}
                  </p>
                  <p className="text-lg font-thin text-dark-blue hidden sm:block">
                    {job.location}
                  </p>
                </div>

                <div className="col-span-1 flex items-center ml-10 hidden sm:flex">
                  <p className="text-dark-blue font-thin">{job.appliedDate}</p>
                </div>
              </div>
            ))}
          </div>
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
