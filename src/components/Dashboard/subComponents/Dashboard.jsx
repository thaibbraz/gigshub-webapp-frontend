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
    {
      title: "Frontend Developer (Vue.js)",
      contractType: "Permanent contract",
      salary: "$55,000",
      company: "GOOGLE",
      location: "Paris, France",
      appliedDate: "01/09/2024, 14:30",
    },
    {
      title: "Machine Learning Engineer",
      contractType: "Permanent contract",
      salary: "$60,000",
      company: "DEEPMIND",
      location: "Paris, France",
      appliedDate: "01/09/2024, 11:48",
    },
    {
      title: "Frontend Developer (React)",
      contractType: "Permanent contract",
      salary: "$50,000",
      company: "MICROSOFT",
      location: "Madrid, Spain",
      appliedDate: "31/08/2024, 16:09",
    },
    {
      title: "Senior Full Stack Developer",
      contractType: "Permanent contract",
      salary: "$65,000",
      company: "AMAZON",
      location: "Milan, Italy",
      appliedDate: "31/08/2024, 18:54",
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
              Sign up
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

//   return (
//     <div className="ml-2">
//       <div className="absolute top-8 left-[1225px] px-10 mx-20">
//         <a
//           href="/logout"
//           className="text-light-purple font-thin hover:underline whitespace-nowrap"
//         >
//           Log out
//         </a>
//       </div>

//       {/* Profile Information Section */}
//       <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto">
//         <div className="border-2 border-pale-purple mt-10 rounded-xl">
//           <div className="flex justify-between items-center my-10 mx-10">
//             <p className="text-dark-blue text-2xl font-extrabold">
//               Your Profile Information
//             </p>
//           </div>

//           {personalInformation.map((info, index) => (
//             <div key={index} className="grid grid-cols-2 gap-10 p-10">
//               {/* First Row: 4 fields */}
//               <div className="grid grid-cols-2 gap-10">
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">First Name</p>
//                   <p className="text-dark-blue text-md">{info.firstName}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Last Name</p>
//                   <p className="text-dark-blue text-md">{info.lastName}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Email</p>
//                   <p className="text-dark-blue text-md">{info.email}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Password</p>
//                   <p className="text-dark-blue text-md">{info.password}</p>
//                 </div>
//               </div>

//               {/* Second Row: 5 fields */}
//               <div className="grid grid-cols-2 gap-10">
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Phone</p>
//                   <p className="text-dark-blue text-md">{info.phone}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">City</p>
//                   <p className="text-dark-blue text-md">{info.city}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Country</p>
//                   <p className="text-dark-blue text-md">{info.country}</p>
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-dark-blue text-lg font-bold">Education</p>
//                   <p className="text-dark-blue text-md">{info.education}</p>
//                 </div>
//                 <div className="flex flex-col col-span-2">
//                   <p className="text-dark-blue text-lg font-bold">Experience (Years)</p>
//                   <p className="text-dark-blue text-md">{info.experience}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

{
  /* <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto">
        <div className="border-2 border-pale-purple mt-10 rounded-xl">
          <div className="flex justify-between items-center my-10 mx-10">
            <p className="text-dark-blue text-2xl font-extrabold">
              Your profile information
            </p>
          </div>
          {personalInformation.map((personalInformation, index) => (
            <div
              key={index}
              className={`h-[112px] w-[1200px] grid grid-cols-4 ${
                index !== personalInformation.length - 1
                  ? "border-b-2 border-pale-purple"
                  : ""
              }`}
            >
        
              <div className="col-span-1 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
                <p className="text-dark-blue text-lg font-extrabold">
                  {personalInformation.firstName}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">

                  <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto">
                    <span className="text-xs text-dark-purple">
                      {personalInformation.lastName}
                    </span>
                  </div>
               
                  <div className="bg-soft-liliac rounded-lg py-1 px-3 text-sm h-auto">
                    <span className="text-xs text-dark-purple">
                      {personalInformation.email}
                    </span>
                  </div>
                </div>
              </div>

           
              <div className="col-span-1 flex flex-col justify-center border-r-2 border-dotted border-pale-purple my-4 ml-10">
                <p className="text-lg font-extrabold text-dark-blue">
                  {personalInformation.phone}
                </p>
                <p className="text-dark-blue font-thin">
                  {personalInformation.city}
                </p>
              </div>

   
              <div className="col-span-1 flex items-center ml-10">
                <p className="text-dark-blue font-thin">
                  {personalInformation.country}
                </p>
              </div>
            </div>
          ))}
        </div> */
}
