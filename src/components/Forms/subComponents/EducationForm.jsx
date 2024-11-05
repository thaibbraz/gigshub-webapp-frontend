import React, { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";

const EducationForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    highest_degree: "",
    institution_name: "",
    graduation_year: "",
    major: "",
  });
  const degreeOptions = [
    "High school diploma",
    "4-year university degree",
    "Post-graduate degree",
    "Technical certification",
  ];
  const fieldName = "highest_degree";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (2 / 5) * 100;

  return (
    <div className="ml-2 mr-10">
      <div className="w-full px-9">
        <div className="flex flex-col bg-white rounded-xl p-10 ml-10 w-full max-w-7xl h-[calc(100vh-28px)]">
          <div className="relative w-12/12 h-3 bg-white rounded-lg mb-6 ml-2">
            <div
              className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full mt-28">
            <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
              Education
            </h2>
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please provide details about your education.
            </p>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
            >
              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Highest degree achieved
                </label>
                <Dropdown
                  options={degreeOptions}
                  handleChange={handleChange}
                  fieldName={fieldName}
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Institution name
                </label>
                <input
                  name="institution_name"
                  value={formData.institution_name}
                  onChange={handleChange}
                  placeholder="Institution name"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Field of study
                </label>
                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  placeholder="Field of study"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Graduation year
                </label>
                <input
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  placeholder="YYYY"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>
              <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
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
    </div>
  );
};

export default EducationForm;
