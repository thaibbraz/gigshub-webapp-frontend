import React, { useState, useEffect } from "react";
import useResumeStore from "../../../stores/resume/resumeStore";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeCreatorProjects = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [unsavedProject, setUnsavedProject] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => 1980 + i);

  useEffect(() => {
    if(!isInitialized && resume?.projects) {
      setProjects(resume.projects);
      setUnsavedProject(resume.projects[0]);
      setIsInitialized(true);
      setActiveTab(parseInt(searchParams.get("project"), 10) || 0);
    }
  }, [resume.projects, isInitialized, searchParams]);

  console.log(resume);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", "project");
      newParams.set("project", activeTab);
      return newParams;
    });

    if(projects[activeTab]) {
      setUnsavedProject({ ...projects[activeTab] });
    }
  }, [activeTab, setSearchParams]);

  const handleSaveInfo = () => {
    const updatedProjects = projects.map((proj, idx) =>
      idx === activeTab
        ? { ...unsavedProject, saved: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` }
        : proj
    );
    setProjects(updatedProjects);

    const updatedResume = {
      ...resume,
      projects: updatedProjects,
    };
    updateResume(updatedResume);
    toast.success("Project saved successfully!");
  };

  const handleInputChange = (input) => {
    const { name, value } = input.target || input;
    setUnsavedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    const newProject = {
      title: "",
      url: "",
      description: "",
      saved: "Not saved yet",
    };
    setProjects((prev) => [...prev, newProject]);
    setUnsavedProject(newProject);
    setActiveTab(projects.length);
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
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTabChange(i)}
            className={`text-sm text-purple ${
              activeTab === i ? "font-bold" : ""
            }`}
          >
            Project {i + 1}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {unsavedProject && (
          <div key={activeTab} className="space-y-4">
            <div>
              <label
                htmlFor={`title-${activeTab}`}
                className="text-sm font-bold text-gray-700"
              >
                PROJECT TITLE
              </label>
              <input
                type="text"
                id={`title-${activeTab}`}
                name="title"
                value={unsavedProject.title || ""}
                onChange={handleInputChange}
                placeholder="Title"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>

            <div>
              <label
                htmlFor={`url-${activeTab}`}
                className="text-sm font-bold text-gray-700"
              >
                PROJECT URL
              </label>
              <input
                type="text"
                id={`url-${activeTab}`}
                name="url"
                value={unsavedProject.url || ""}
                onChange={handleInputChange}
                placeholder="URL"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>

            <div>
              <label
                htmlFor={`description-${activeTab}`}
                className="text-sm font-bold text-gray-700"
              >
                PROJECT DESCRIPTION
              </label>
              <textarea
                id={`description-${activeTab}`}
                name="description"
                value={unsavedProject.description || ""}
                onChange={handleInputChange}
                placeholder="Describe your project"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
                rows={4}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button type="button" onClick={handleAddProject} className="flex items-center px-3 -mx-3 gap-2 py-2 text-purple">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.89464 8.51957 12 8.26522 12 8C12 7.73478 11.89464 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z" fill="currentColor"/></svg>
            Add new
          </button>
          <button type="submit" className="px-6 py-3 bg-purple text-white rounded-md shadow-md focus:ring">
            Save info
          </button>
        </div>
        <p className="text-xs text-gray-400 text-right mt-3">
          Saved: {projects[activeTab]?.saved || "Not saved yet"}
        </p>
      </form>
    </div>
  );
};

export default ResumeCreatorProjects;
