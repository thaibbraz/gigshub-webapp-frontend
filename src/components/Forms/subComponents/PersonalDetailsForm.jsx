import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const PersonalDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({ data });

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
                    name="first name"
                    value={formData["first name"]}
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
                    name="last name"
                    value={formData["last name"]}
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
