import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../../assets/searchIcon.svg";

const SkillsForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const navigate = useNavigate();

  const progress = (4 / 4) * 100;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (
      searchTerm &&
      !selectedSkills.includes(searchTerm) &&
      selectedSkills.length < 10
    ) {
      setSelectedSkills([...selectedSkills, searchTerm]);
      setSearchTerm(""); // Clear search input after adding the skill
      setLimitReached(false);
    } else if (selectedSkills.length >= 10) {
      setLimitReached(true); // Show message if 10 skills are reached
    }
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  return (
    <div className="ml-2 mr-10">
      <div className="flex flex-col bg-white rounded-xl p-10 ml-10 maincontainer w-full max-w-7xl h-[calc(100vh-28px)]">
        <div className="relative w-full h-3 bg-white rounded-lg mb-6 ml-2">
          <div
            className="absolute h-full bg-lime-green rounded-lg transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full mt-24">
          <h2 className="text-3xl font-bold text-dark-blue text-center mb-4">
            Add skills
          </h2>
          <p className="text-center text-sm mb-8 text-dark-purple">
            Select up to 10 skills to add to your resume.
          </p>

          {/* Search bar */}
          <form
            className="flex flex-col items-center"
            onSubmit={handleSearchSubmit}
          >
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder={
                  limitReached
                    ? "You have reached the 10 skills limit"
                    : "Search"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={limitReached}
                className={`border border-gray-300 rounded-2xl h-input py-3 px-12 mb-6 w-full shadow dark-blue${
                  limitReached ? "text-red-500" : ""
                }`}
              />
              <img
                src={searchIcon}
                alt="Search"
                className="absolute left-5 top-1/3 transform -translate-y-1/2 h-5 w-5 "
              />
            </div>

            {/* Skills list */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {selectedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-soft-liliac rounded-lg py-2 px-4 text-sm h-auto"
                  style={{ minWidth: "fit-content" }}
                >
                  <span className="text-xs text-dark-purple">{skill}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
            >
              <div className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5">
                <span className="text-sm text-white font-normal">Confirm</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
