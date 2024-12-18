import React, { useState, useEffect } from "react";
import useResumeStore from "../../../stores/resume/resumeStore";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ResumeCreatorProjects = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [unsavedProject, setUnsavedProject] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    if (!isInitialized && resume?.projects) {
      setProjects(resume.projects);
      setUnsavedProject(resume.projects[0]);
      setIsInitialized(true);
      setActiveTab(parseInt(searchParams.get("project"), 10) || 0);
    }
  }, [resume.projects, isInitialized, searchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", "project");
      newParams.set("project", activeTab);
      return newParams;
    });

    if (projects[activeTab]) {
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

  const handleDeleteProject = () => {
    const updatedProjects = projects.filter((_, idx) => idx !== projectToDelete);
    setProjects(updatedProjects);
    setShowDeleteModal(false);

    // Adjust active tab if the deleted tab was the active one
    if (activeTab >= updatedProjects.length) {
      setActiveTab(updatedProjects.length - 1);
    }

    const updatedResume = {
      ...resume,
      projects: updatedProjects,
    };
    updateResume(updatedResume);
    toast.success("Project deleted successfully!");
  };

  const handleOpenDeleteModal = (index) => {
    setProjectToDelete(index);
    setShowDeleteModal(true);
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
        {projects.map((p, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border-[1px] border-gray-200 px-2 py-1">
            <button
              onClick={() => handleTabChange(i)}
              className={`text-sm text-purple ${activeTab === i ? "font-bold" : ""}`}
            >
              {p.title || `Project ${i + 1}`}
            </button>
            <button
              type="button"
              onClick={() => handleOpenDeleteModal(i)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <Tooltip id="tooltip" />
      
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
                required
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
              <label htmlFor={`description-${activeTab}`} className="text-sm font-bold text-gray-700">
                PROJECT DESCRIPTION
                <button type="button" className="ms-2" data-tooltip-id="tooltip" data-tooltip-content="Tailor AI suggestions for this section">
                  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5775 9.69376L14.6451 10.4064C13.0806 10.9833 11.8474 12.2165 11.2705 13.7809L10.5578 15.7134C10.531 15.786 10.4617 15.8343 10.3843 15.8343C10.3068 15.8343 10.2376 15.786 10.2108 15.7134L9.49803 13.781C8.9211 12.2165 7.68784 10.9833 6.12347 10.4064L4.19097 9.69376C4.11832 9.66697 4.07007 9.5977 4.07007 9.52026C4.07007 9.44282 4.11832 9.37355 4.19097 9.34675L6.12358 8.63389C7.68795 8.05696 8.9211 6.82381 9.49803 5.25944L10.2108 3.32683C10.2376 3.25418 10.3068 3.20593 10.3843 3.20593C10.4617 3.20593 10.531 3.25418 10.5578 3.32683L11.2705 5.25944C11.8475 6.82381 13.0806 8.05707 14.645 8.63389L16.5776 9.34675C16.6503 9.37355 16.6985 9.44282 16.6985 9.52026C16.6985 9.5977 16.6501 9.66697 16.5775 9.69376Z" fill="#3F33C0"/><path d="M7.02037 15.089L6.10417 15.4269C5.36255 15.7004 4.778 16.2849 4.50462 17.0266L4.16665 17.9425C4.15402 17.9771 4.12112 17.9999 4.08442 17.9999C4.04771 17.9999 4.01482 17.9771 4.00219 17.9426L3.66433 17.0268C3.39084 16.2852 2.80617 15.7005 2.06456 15.427L1.14835 15.0891C1.11394 15.0765 1.09106 15.0436 1.09106 15.0069C1.09106 14.9702 1.11394 14.9373 1.14835 14.9247L2.06445 14.5867C2.80617 14.3132 3.39084 13.7286 3.66433 12.9868L4.00219 12.0708C4.01482 12.0364 4.04771 12.0136 4.08442 12.0136C4.12112 12.0136 4.15402 12.0364 4.16665 12.0708L4.50462 12.9869C4.77811 13.7287 5.36266 14.3132 6.10438 14.5866L7.02048 14.9246C7.0549 14.9372 7.07777 14.9701 7.07777 15.0068C7.07777 15.0435 7.0549 15.0764 7.02037 15.089Z" fill="#3F33C0"/><path d="M7.45795 4.80257L6.30561 5.22735C5.37285 5.57131 4.63745 6.30671 4.29327 7.23958L3.86839 8.39192C3.85238 8.43516 3.8111 8.46402 3.76492 8.46402C3.71874 8.46402 3.67746 8.43516 3.66145 8.39192L3.23656 7.23969C2.89261 6.30682 2.1572 5.57141 1.22422 5.22735L0.0721028 4.80257C0.0286451 4.78667 0 4.74528 0 4.6991C0 4.65292 0.028754 4.61153 0.0721028 4.59563L1.22433 4.17064C2.15709 3.82668 2.8925 3.09128 3.23656 2.15841L3.66145 1.00607C3.67746 0.962719 3.71874 0.933967 3.76492 0.933967C3.8111 0.933967 3.85249 0.962719 3.86839 1.00607L4.29338 2.15851C4.63734 3.09127 5.37263 3.82657 6.3055 4.17064L7.45795 4.59563C7.5013 4.61153 7.53005 4.65292 7.53005 4.6991C7.53005 4.74528 7.50141 4.78667 7.45795 4.80257Z" fill="#3F33C0"/></svg>
                </button>
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
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center px-3 -mx-3 gap-2 py-2 text-purple"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.89464 8.51957 12 8.26522 12 8C12 7.73478 11.89464 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z"
                fill="currentColor"
              />
            </svg>
            Add new
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-purple text-white rounded-md shadow-md focus:ring"
          >
            Save info
          </button>
        </div>
        <p className="text-xs text-gray-400 text-right mt-3">
          Saved: {projects[activeTab]?.saved || "Not saved yet"}
        </p>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Delete Project</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCreatorProjects;
