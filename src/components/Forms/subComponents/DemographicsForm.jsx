import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown/Dropdown";

const DemographicsForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    ethnicity: "",
    veteran_status: "",
    disability_status: "",
    lgbt: "",
  });
  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to disclose",
  ];

  const lgbtOptions = [
    "Heterosexual (Straight)",
    "Gay or Lesbian",
    "Bisexual",
    "Asexual",
    "Pansexual",
    "Queer",
    "Other",
    "Prefer not to disclose",
  ];

  const ethnicityOptions = [
    "Hispanic or Latino",
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or More Races",
  ];

  const veteranOptions = [
    "I am a protected veteran",
    "I am not a protected veteran",
    "I do not wish to disclose my veteran status",
  ];

  const disabilityOptions = [
    "Yes, I have a disability (or previously had one)",
    "No, I do not have a disability",
    "I do not wish to answer",
  ];

  const navigate = useNavigate();

  const progress = (6 / 6) * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  return (
    <div className="ml-2 mr-10">
      <div className="flex flex-col bg-white rounded-xl p-10 ml-10 maincontainer w-full max-w-7xl h-[calc(100vh-28px)]">
        <div className="relative w-full h-3 bg-white rounded-lg mb-6 ml-2">
          <div
            className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full mt-24 mx-auto">
          <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
            Demographics
          </h2>
          <p className="text-center text-sm mb-8 text-dark-purple">
            Some employers request this information. It is optional.
          </p>

          <form
            onSubmit={handleConfirm}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
          >
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">Gender</label>
              <Dropdown
                options={genderOptions}
                fieldName={formData.gender}
                handleChange={handleChange}
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Race or Ethnicity
              </label>
              <Dropdown
                options={ethnicityOptions}
                fieldName={formData.ethnicity}
                handleChange={handleChange}
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Veteran status
              </label>
              <Dropdown
                options={veteranOptions}
                fieldName={formData.veteran_status}
                handleChange={handleChange}
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Disability status
              </label>
              <Dropdown
                options={disabilityOptions}
                fieldName={formData.disability_status}
                handleChange={handleChange}
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Sexual orientation
              </label>
              <Dropdown
                options={lgbtOptions}
                fieldName={formData.lgbt}
                handleChange={handleChange}
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-full shadow dark-blue"
              />
            </div>

            <div className="lg:col-span-4 flex justify-center mt-4">
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

export default DemographicsForm;
