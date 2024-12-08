import React, { useState } from "react";
import axios from "axios"; // Ensure you have axios installed
import starsUnfilled from "../../assets/starsUnfilled.svg";

const AIJobMatch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  const fetchJobs = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.get("https://api.example.com/jobs");
      setJobs(response.data); // Assuming the response data is an array of jobs
    } catch (err) {
      setError("Failed to fetch jobs. Please try again."); // Set error message
      console.error(err); // Log error for debugging
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="ml-2 mr-10">
      {/* Top Filter Section */}
      <div className="w-full px-9">
        <div className="flex flex-col lg:flex-row items-center mb-4 mt-6 max-w-7xl gap-x-6 ml-10 w-[90%]">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Job Title Input */}
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Job Title"
                className="border border-gray-300 rounded-2xl h-input py-2 px-4 shadow dark-blue"
              />
            </div>
            {/* Salary Expectation Input */}
            <div className="flex flex-col mt-4 lg:mt-0">
              <label className="text-light-liliac text-sm mb-2">
                Salary Expectation
              </label>
              <input
                type="text"
                placeholder="Salary expectation"
                className="border border-gray-300 rounded-2xl h-input py-2 px-4 shadow dark-blue"
              />
            </div>
            {/* Location Input */}
            <div className="flex flex-col mt-4 lg:mt-0">
              <label className="text-light-liliac text-sm mb-2">Location</label>
              <select
  placeholder="Location"
  className="border border-gray-300 rounded-2xl h-input py-2 px-4 shadow dark-blue"
    >
        <option value="" disabled selected>Select a location</option>
        <option value="Argentina">Argentina</option>
        <option value="Australia">Australia*</option>
        <option value="Austria">Austria*</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Belgium">Belgium*</option>
        <option value="Brazil">Brazil*</option>
        <option value="Canada">Canada*</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="Finland">Finland</option>
        <option value="France">France*</option>
        <option value="Germany">Germany*</option>
        <option value="Greece">Greece</option>
        <option value="Hong Kong">Hong Kong*</option>
        <option value="Hungary">Hungary</option>
        <option value="India">India*</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Ireland">Ireland*</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy*</option>
        <option value="Japan">Japan</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Mexico">Mexico*</option>
        <option value="Morocco">Morocco</option>
        <option value="Netherlands">Netherlands*</option>
        <option value="New Zealand">New Zealand*</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Panama">Panama</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Qatar">Qatar</option>
        <option value="Romania">Romania</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Singapore">Singapore*</option>
        <option value="South Africa">South Africa</option>
        <option value="South Korea">South Korea</option>
        <option value="Spain">Spain*</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland*</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Thailand">Thailand</option>
        <option value="Turkey">Turkey</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="UK">UK*</option>
        <option value="USA">USA*</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Vietnam">Vietnam*</option>
    </select>

            </div>
          </div>

          {/* Auto Apply Button */}
          <button
            onClick={fetchJobs}
            className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6 lg:mt-0 lg:-mb-5 ml-0 lg:ml-10"
          >
            <div className="flex items-center justify-center w-40 h-input bg-dark-blue rounded-2xl border-5">
              <img
                src={starsUnfilled}
                alt="Stars Icon"
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm text-white font-thin py-6">
                {loading ? "Applying..." : "Auto Apply"}
              </span>
            </div>
          </button>

          {/* Daily Limit */}
          <p className="text-light-purple text-xs font-thin mt-6 xl:ml-60 mlg:ml-20"></p>
        </div>

        {/* Job List Section */}
        <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-[calc(100vh-28px)] overflow-y-auto overflow-x-auto">
          <div className="w-full px-9">
            {error && <p className="text-center text-red-500">{error}</p>}
            {loading && (
              <p className="text-center text-gray-500">Loading jobs...</p>
            )}
            {jobs.length === 0 && !loading && (
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

export default AIJobMatch;
