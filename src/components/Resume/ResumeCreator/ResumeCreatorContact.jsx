import React, { useState } from "react";

const ResumeCreatorContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    linkedin: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="text-sm font-bold text-gray-700">
          FULL NAME
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Username"
          className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="text-sm font-bold text-gray-700">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Username"
          className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-bold text-gray-700">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Username"
          className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="text-sm font-bold text-gray-700">
          LINKEDIN
        </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder="Username"
          className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
        />
      </div>

      <div>
        <label htmlFor="country" className="text-sm font-bold text-gray-700">
          COUNTRY
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
        >
          <option value="" disabled>
            Select a country
          </option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="in">India</option>
        </select>
      </div>

      <div className="flex flex-col items-end justify-between gap-3 mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-purple text-white rounded-md shadow-md hover:bg-purple focus:ring focus:ring-purple"
        >
          Save info
        </button>
        <div className="text-xs flex gap-2 text-gray-500">
          <span className="text-orange-500">●</span>
          Not saved
        </div>
      </div>
    </form>
  );
};

export default ResumeCreatorContact;
