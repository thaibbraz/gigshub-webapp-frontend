import React, { useState } from "react";
import { Container } from "../../Container/Container";

const PersonalDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    education: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div>
      <div
        className="absolute top-6 left-[1225px] px-10 mx-20
      "
      >
        <a href="/logout" className="text-dark-blue font-medium">
          Log out
        </a>
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-xl p-10 ml-24 pl-4 maincontainer w-full max-w-7xl h-[calc(100vh-28px)]">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
            Personal Details
          </h2>
          <p className="text-gray-500 text-center text-sm mb-8 text-dark-purple">
            Please fill out your personal information
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
          >
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                First name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Last name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">E-mail</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Education
              </label>
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Education"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light-liliac text-sm mb-2">
                Years of experience
              </label>
              <input
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="Years of experience"
                className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto"
              />
            </div>

            <div className="col-span-4 flex justify-center mt-4">
              <button className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple">
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

export default PersonalDetailsForm;
