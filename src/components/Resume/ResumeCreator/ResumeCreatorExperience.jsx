import React, { useState, useEffect } from "react";
import useResumeStore from "../../../stores/resume/resumeStore";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeCreatorExperience = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const [searchParams, setSearchParams] = useSearchParams();
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

  useEffect(() => {
    if(!isInitialized && resume?.experiences) {
      setExperiences(resume.experiences);
      setIsInitialized(true);
      setActiveTab(parseInt(searchParams.get("exp"), 10) || 0);
    }
  }, [resume.experiences, isInitialized, searchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", "experience");
      newParams.set("exp", activeTab);
      return newParams;
    });
  }, [activeTab, setSearchParams]);

  const handleSaveInfo = () => {
    const updatedResume = {
      ...resume,
      experiences,
    };
    updateResume(updatedResume);
    toast.success("Experiences saved successfully!");
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setExperiences((prev) =>
      prev.map((exp, idx) => {
        if(idx === index) {
          if(name === "startYear" || name === "endYear") {
            const [startYear, endYear] = exp.date.split("-").map((y) => y.trim());
            const updatedDate = name === "startYear" ? `${value}-${endYear || ""}`.trim() : `${startYear || ""}-${value}`.trim();
            return { ...exp, date: updatedDate };
          }
          return { ...exp, [name]: value };
        }
        return exp;
      })
    );
    console.log(experiences);
  };

  const handleAddExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      date: "",
      location: "",
      description: "",
    };
    setExperiences((prev) => [...prev, newExperience]);
    setActiveTab(experiences.length);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveInfo();
  };

  return (
    <div>
      <ToastContainer position={"top-center"} autoClose={1000} hideProgressBar={true} />

      {/* Tabs */}
      <div className="flex flex-wrap text-nowrap gap-4 mb-6">
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTabChange(i)}
            className={`text-sm text-purple ${
              activeTab === i ? "font-bold" : ""
            }`}
          >
            Experience {i + 1}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {experiences
          .filter((_, i) => i === activeTab)
          .map((exp, i) => (
            <div key={i} className="space-y-4">
              <div>
                <label
                  htmlFor={`title-${i}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHAT WAS YOUR ROLE AT THE COMPANY?
                </label>
                <input
                  type="text"
                  id={`title-${i}`}
                  name="title"
                  value={exp.title || ""}
                  onChange={(e) => handleInputChange(e, i)}
                  placeholder="Role"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label
                  htmlFor={`company-${i}`}
                  className="text-sm font-bold text-gray-700"
                >
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  id={`company-${i}`}
                  name="company"
                  value={exp.company || ""}
                  onChange={(e) => handleInputChange(e, i)}
                  placeholder="Company Name"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor={`startYear-${i}`}
                    className="text-sm font-bold text-gray-700"
                  >
                    START YEAR
                  </label>
                  <select
                    id={`startYear-${i}`}
                    name="startYear"
                    value={exp.date.split("-")[0] || ""}
                    onChange={(e) => handleInputChange(e, i)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`endYear-${i}`}
                    className="text-sm font-bold text-gray-700"
                  >
                    END YEAR
                  </label>
                  <select
                    id={`endYear-${i}`}
                    name="endYear"
                    value={exp.date.split("-")[1] || ""}
                    onChange={(e) => handleInputChange(e, i)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`location-${i}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHERE WAS THE COMPANY LOCATED?
                </label>
                <input
                  type="text"
                  id={`location-${i}`}
                  name="location"
                  value={exp.location || ""}
                  onChange={(e) => handleInputChange(e, i)}
                  placeholder="Location"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label
                  htmlFor={`description-${i}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHAT DID YOU DO AT THE COMPANY?
                </label>
                <textarea
                  id={`description-${i}`}
                  name="description"
                  value={exp.description || ""}
                  onChange={(e) => handleInputChange(e, i)}
                  placeholder="• Describe your tasks and achievements"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  rows={4}
                />
              </div>
            </div>
          ))}

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleAddExperience}
            className="flex items-center px-3 -mx-3 gap-2 py-2 text-purple"
          >
            Add new
          </button>
          <button type="submit" className="px-6 py-3 bg-purple text-white rounded-md shadow-md focus:ring">
            Save info
          </button>
        </div>

        <p className="text-xs text-gray-400 text-right mt-3">
          Saved: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
      </form>
    </div>
  );
};

export default ResumeCreatorExperience;
