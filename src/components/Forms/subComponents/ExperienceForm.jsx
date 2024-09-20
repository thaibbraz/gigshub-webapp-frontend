import React, { useState } from "react";

const ExperienceForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    currentWorkplace: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ExperienceForm submitted");
    onNext(formData);
  };

  const progress = (2 / 3) * 100;

  return (
    <div>
      <div
        className="absolute top-8 left-[1225px] px-10 mx-20
      "
      >
        <a
          href="/logout"
          className="text-light-purple font-thin  hover:underline whitespace-nowrap"
        >
          Log out
        </a>
      </div>
      <div className="flex flex-col bg-white rounded-xl p-10 ml-24 pl-4 maincontainer w-full max-w-7xl h-[calc(100vh-28px)]">
        <div className="relative w-12/12 h-3 bg-white rounded-lg mb-6 ml-2">
          <div
            className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-full mt-28">
          <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
            Experience
          </h2>
          <p className="text-center text-sm mb-8 text-dark-purple">
            Please fill out your work experience information
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
          >
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Job title
              </label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Job title"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Start date
              </label>
              <input
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="DD-MM-YY"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">End date</label>
              <input
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="DD-MM-YY"
                disabled={formData.currentWorkplace}
                className={`border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto ${
                  formData.currentWorkplace ? "bg-gray-200" : ""
                }`}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="currentWorkplace"
                checked={formData.currentWorkplace}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-light-liliac text-sm">
                Current workplace?
              </label>
            </div>
            <div className="col-span-4 flex justify-center mt-4">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
