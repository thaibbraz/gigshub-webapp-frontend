import React, { useState, useEffect } from "react";
import useResumeStore from "../../../stores/resume/resumeStore";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeCreatorEducation = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const [searchParams, setSearchParams] = useSearchParams();
  const [education, setEducation] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [unsavedEdu, setUnsavedEdu] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);

  useEffect(() => {
    if (!isInitialized && resume?.education) {
      const validEducation = resume.education.filter(
        (edu) => typeof edu === "object" && edu !== null
      );
      setEducation(validEducation);
      setUnsavedEdu(validEducation[0]);
      setIsInitialized(true);
      setActiveTab(parseInt(searchParams.get("edu"), 10) || 0);
    }
  }, [resume.education, isInitialized, searchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", "education");
      newParams.set("edu", activeTab);
      return newParams;
    });

    if (education[activeTab]) {
      setUnsavedEdu({ ...education[activeTab] });
    }
  }, [activeTab, setSearchParams]);

  const handleSaveInfo = () => {
    const updatedEducation = education.map((edu, idx) =>
      idx === activeTab
        ? { ...unsavedEdu, saved: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` }
        : edu
    );
    setEducation(updatedEducation);

    const updatedResume = {
      ...resume,
      education: updatedEducation,
    };
    updateResume(updatedResume);
    toast.success("Education saved successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnsavedEdu((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      major: "",
      date: "",
      saved: "Not saved yet",
    };
    setEducation((prev) => [...prev, newEducation]);
    setUnsavedEdu(newEducation);
    setActiveTab(education.length);
  };

  const handleDeleteEducation = () => {
    const updatedEducation = education.filter((_, idx) => idx !== educationToDelete);
    setEducation(updatedEducation);
    setShowDeleteModal(false);

    // Adjust active tab if the deleted tab was the active one
    if (activeTab >= updatedEducation.length) {
      setActiveTab(updatedEducation.length - 1);
    }

    const updatedResume = {
      ...resume,
      education: updatedEducation,
    };
    updateResume(updatedResume);
    toast.success("Education entry deleted successfully!");
  };

  const handleOpenDeleteModal = (index) => {
    setEducationToDelete(index);
    setShowDeleteModal(true);
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
        {education.map((edu, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border-[1px] border-gray-200 px-2 py-1">
            <button
              onClick={() => handleTabChange(i)}
              className={`text-sm text-purple ${activeTab === i ? "font-bold" : ""}`}
            >
              {edu.degree || `Education ${i + 1}`}
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {unsavedEdu && (
          <div key={activeTab} className="space-y-4">
            <div>
              <label htmlFor={`degree-${activeTab}`} className="text-sm font-bold text-gray-700">
                DEGREE
              </label>
              <input
                type="text"
                id={`degree-${activeTab}`}
                name="degree"
                value={unsavedEdu.degree || ""}
                onChange={handleInputChange}
                placeholder="Degree"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>

            <div>
              <label htmlFor={`institution-${activeTab}`} className="text-sm font-bold text-gray-700">
                INSTITUTION NAME
              </label>
              <input
                type="text"
                id={`institution-${activeTab}`}
                name="institution"
                value={unsavedEdu.institution || ""}
                onChange={handleInputChange}
                placeholder="Institution Name"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>

            <div>
              <label htmlFor={`major-${activeTab}`} className="text-sm font-bold text-gray-700">
                FIELD OF STUDY
              </label>
              <input
                type="text"
                id={`major-${activeTab}`}
                name="major"
                value={unsavedEdu.major || ""}
                onChange={handleInputChange}
                placeholder="Field of Study"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>

            <div>
              <label htmlFor={`date-${activeTab}`} className="text-sm font-bold text-gray-700">
                GRADUATION YEAR
              </label>
              <input
                type="text"
                id={`date-${activeTab}`}
                name="date"
                value={unsavedEdu.date || ""}
                onChange={handleInputChange}
                placeholder="Month YYYY"
                className="mt-1 w-full p-2 border rounded-md text focus:ring-purple focus:border-purple"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleAddEducation}
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
          Saved: {education[activeTab]?.saved || "Not saved yet"}
        </p>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Delete Education</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this education entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEducation}
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

export default ResumeCreatorEducation;
