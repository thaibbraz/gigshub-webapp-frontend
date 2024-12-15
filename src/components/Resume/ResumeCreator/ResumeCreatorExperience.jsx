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
  const [activeTab, setActiveTab] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const experienceId = parseInt(searchParams.get("exp"), 10);
    if (!isInitialized && resume.cv?.experiences) {
      setExperiences(resume.cv.experiences);
      setIsInitialized(true);
      setActiveTab(experienceId || resume.cv.experiences[0]?.id || 1);
    }
  }, [resume.cv?.experiences, isInitialized, searchParams]);

  useEffect(() => {
    if (activeTab !== null) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("tab", "experience");
        newParams.set("exp", activeTab);
        return newParams;
      });
    }
  }, [activeTab, setSearchParams]);

  const handleSaveInfo = () => {
    const updatedResume = {
      ...resume,
      cv: { ...resume.cv, experiences },
    };
    updateResume(updatedResume);
    toast.success("Experiences saved successfully!");
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [name]: value } : exp))
    );
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: experiences.length > 0 ? experiences[experiences.length - 1].id + 1 : 1,
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    setExperiences((prev) => [...prev, newExperience]);
    setActiveTab(newExperience.id);
  };

  const handleTabChange = (id) => {
    setActiveTab(id);
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
        {experiences.map((exp) => (
          <button
            key={exp.id}
            onClick={() => handleTabChange(exp.id)}
            className={`text-sm text-purple ${
              activeTab === exp.id ? "font-bold" : ""
            }`}
          >
            Experience {exp.id}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {experiences
          .filter((exp) => exp.id === activeTab)
          .map((exp) => (
            <div key={exp.id} className="space-y-4">
              <div>
                <label
                  htmlFor={`role-${exp.id}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHAT WAS YOUR ROLE AT THE COMPANY?
                </label>
                <input
                  type="text"
                  id={`role-${exp.id}`}
                  name="role"
                  value={exp.role || ""}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Role"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label
                  htmlFor={`company-${exp.id}`}
                  className="text-sm font-bold text-gray-700"
                >
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  id={`company-${exp.id}`}
                  name="company"
                  value={exp.company || ""}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Company Name"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor={`startDate-${exp.id}`}
                    className="text-sm font-bold text-gray-700"
                  >
                    STARTED
                  </label>
                  <input
                    type="date"
                    id={`startDate-${exp.id}`}
                    name="startDate"
                    value={exp.startDate || ""}
                    onChange={(e) => handleInputChange(e, exp.id)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`endDate-${exp.id}`}
                    className="text-sm font-bold text-gray-700"
                  >
                    FINISHED
                  </label>
                  <input
                    type="date"
                    id={`endDate-${exp.id}`}
                    name="endDate"
                    value={exp.endDate || ""}
                    onChange={(e) => handleInputChange(e, exp.id)}
                    className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`location-${exp.id}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHERE WAS THE COMPANY LOCATED?
                </label>
                <input
                  type="text"
                  id={`location-${exp.id}`}
                  name="location"
                  value={exp.location || ""}
                  onChange={(e) => handleInputChange(e, exp.id)}
                  placeholder="Location"
                  className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                />
              </div>

              <div>
                <label
                  htmlFor={`description-${exp.id}`}
                  className="text-sm font-bold text-gray-700"
                >
                  WHAT DID YOU DO AT THE COMPANY?
                </label>
                <textarea
                  id={`description-${exp.id}`}
                  name="description"
                  value={exp.description || ""}
                  onChange={(e) => handleInputChange(e, exp.id)}
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
