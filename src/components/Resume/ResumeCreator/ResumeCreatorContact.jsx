import React, { useState, useEffect } from "react";
import useResumeStore from '../../../stores/resume/resumeStore';
import Select from 'react-select';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "../../../static/countryList.js";

const ResumeCreatorContact = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);
  const initializeResume = useResumeStore((state) => state.initializeResume);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    linkedin: "",
    country: "",
  });

  const [countries, setCountries] = useState([]);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    initializeResume();
  }, [initializeResume]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...resume }));
  }, [resume]);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = countryList
        const countryOptions = data.map((country) => ({
          value: country.value,
          label: country.name,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, country: selectedOption?.value || "" }));
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume(formData);
    toast.success("Contact Info saved successfully!");
    setIsSaved(true);
  };

  return (
    <>
      <ToastContainer position={"top-center"} autoClose={1000} hideProgressBar={true} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="grow">
            <label htmlFor="first_name" className="text-sm font-bold text-gray-700">
              FIRST NAME
            </label>
            <input
              required
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleInputChange}
              placeholder="First Name"
              className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
            />
          </div>
          <div className="grow">
            <label htmlFor="last_name" className="text-sm font-bold text-gray-700">
              LAST NAME
            </label>
            <input
              required
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
            />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="text-sm font-bold text-gray-700">
            JOB TITLE
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-bold text-gray-700">
            PHONE NUMBER
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleInputChange}
            placeholder="Phone Number"
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
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
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
            value={formData.linkedin || ''}
            onChange={handleInputChange}
            placeholder="LinkedIn"
            className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
          />
        </div>

        <div>
          <label htmlFor="country" className="text-sm font-bold text-gray-700">
            COUNTRY
          </label>
          <Select
            required
            id="country"
            options={countries || []}
            value={countries.find((option) => option.value === formData.country) || null}
            onChange={handleCountryChange}
            placeholder="Select a country"
            className="mt-1"
          />
        </div>

        <div className="flex flex-col items-end justify-between gap-3 mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-purple text-white rounded-md shadow-md hover:bg-purple focus:ring focus:ring-purple"
          >
            Save info
          </button>
          <div className="text-xs flex gap-2 text-gray-500">
            <span className={isSaved ? "text-green-500" : "text-orange-500"}>●</span>
            {isSaved ? "Saved" : "Not saved"}
          </div>
        </div>
      </form>
    </>
  );
};

export default ResumeCreatorContact;
