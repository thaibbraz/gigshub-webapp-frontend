import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const PersonalDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({});

  const handleChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (2 / 8) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)]">
          <ProgressBar progress={progress} />
          <div className="w-full mt-28">
            <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
              Personal Details
            </h2>
            {/* {pdfFile != null && resumeText === null ? (
              <p className="text-center text-sm mb-8 text-dark-purple">
                Retrieving your data ... This process will take a while
              </p>
            ) : (
              <p className="text-center text-sm mb-8 text-dark-purple">
                Please upload your CV
              </p>
            )}
            {pdfFile != null && resumeText !== null ? (
              <p className="text-center text-sm mb-8 text-dark-purple">Done!</p>
            ) : (
              <p className="text-center text-sm mb-8 text-dark-purple"></p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Ideal job location
                </label>
                <input
                  name="job_location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Job location"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Job title
                </label>
                <input
                  name="job_title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job title"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
            >
              

              <div className="py-8 pl-2 flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Upload Resume
                </label>
                <input
                  type="file"
                  className="w-auto"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                />
              </div>


              <div className="lg:col-span-4 sm:col-span-2 mc:col-span-1 flex justify-center mt-4">
                <button
                  className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                  type="submit"
                > 
                {pdfFile != null && resumeText === null ? (
                  <button
                    disabled
                    className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5 cursor-not-allowed opacity-50"
                  >
                    <span className="text-sm text-white font-normal">
                      Continue
                    </span>
                  </button>
                ) : null} */}
            {/* </form> */}
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please fill out your personal information
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl">
                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    First name
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    Last name
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    E-mail
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    LinkedIn
                  </label>
                  <input
                    name="linkedin_url"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn profile"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    GitHub
                  </label>
                  <input
                    name="github_url"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="GitHub profile"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-light-liliac text-sm mb-2">
                    Portfolio website
                  </label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Portfolio website"
                    className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                  />
                </div>

                <div className="lg:col-span-4 sm:col-span-2 mc:col-span-1 flex justify-center mt-4">
                  <button
                    className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                    type="submit"
                  >
                    <div className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5">
                      <span className="text-sm text-white font-normal">
                        Continue
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
