import React, { useState, useEffect } from "react";
import useResumeStore from "../../../stores/resume/resumeStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import searchIcon from "../../../assets/searchIcon.svg";
import Skill from "./Skill";

const ResumeCreatorSkills = () => {
  const resume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);

  const [skills, setSkills] = useState([]);
  const [unsavedSkills, setUnsavedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && resume?.skills?.[0]?.list) {
      const validSkills = Array.isArray(resume.skills[0].list)
        ? resume.skills[0].list
        : [];
      setSkills(validSkills);
      setUnsavedSkills([...validSkills]);
      setIsInitialized(true);
    }
  }, [resume.skills, isInitialized]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && !unsavedSkills.includes(searchTerm) && unsavedSkills.length < 10) {
      setUnsavedSkills([...unsavedSkills, searchTerm]);
      setSearchTerm("");
      setLimitReached(false);
    } else if (unsavedSkills.length >= 10) {
      setLimitReached(true);
    }
  };

  const handleDeleteSkill = (skill) => {
    setUnsavedSkills(unsavedSkills.filter((s) => s !== skill));
    setLimitReached(false);
  };

  const handleSaveInfo = () => {
    const updatedSkills = [{ list: unsavedSkills }];
    setSkills(unsavedSkills);

    const updatedResume = {
      ...resume,
      skills: updatedSkills,
    };
    updateResume(updatedResume);
    toast.success("Skills saved successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveInfo();
  };

  return (
    <div>
      <ToastContainer position={"top-center"} autoClose={1000} hideProgressBar={true} />

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Skills</h2>
        <p className="text-sm text-gray-600 mb-6">
          Add up to 10 skills to include in your resume.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col items-center">
          <div className="relative w-full mb-4 focus-visible:outline-none">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
              </div>
              <input
                type="search"
                placeholder={limitReached ? "You have reached the 10 skills limit" : "Type a skill and press enter"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={limitReached}
                className={`border border-gray-300 focus-visible:outline-none rounded-lg py-2 ps-10 pe-5 w-full ${
                  limitReached ? "text-red-500" : ""
                }`}
              />
            </div>
          </div>
        </form>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2 mb-6">
          {unsavedSkills.map((skill, index) => (
            <Skill key={index} skill={skill} onDelete={handleDeleteSkill} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleSaveInfo}
            className="px-6 py-2 bg-purple text-white rounded-md shadow-md"
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCreatorSkills;
