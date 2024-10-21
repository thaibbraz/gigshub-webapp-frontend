import React, { useState } from "react";

const PersonalDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    education: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const progress = (1 / 3) * 100;

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
              Personal Details
            </h2>
            <p className="text-center text-sm mb-8 text-dark-purple">
              Please fill out your personal information
            </p>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mx-auto w-full max-w-4xl"
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
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
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
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">E-mail</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-light-liliac text-sm mb-2">
                  Country
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
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
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
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
                  className="border border-gray-300 rounded-2xl h-input py-3 px-4 w-auto shadow dark-blue"
                />
              </div>

              {/* Submit Button */}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
