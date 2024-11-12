import React, { useState, useEffect } from "react";
import searchIcon from "../../../assets/searchIcon.svg";
import LanguageRow from "./LanguageRow";
import ProgressBar from "./ProgressBar";

const SkillsForm = ({ onNext }) => {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [languages, setLanguages] = useState([
    {
      id: Date.now(),
      language: "",
      level: "",
    },
  ]);

  const progress = (6 / 8) * 100;

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now(),
        language: "",
        level: "",
      },
    ]);
  };

  const handleDeleteLanguage = (id) => {
    setLanguages(languages.filter((l) => l.id !== id));
  };

  const handleLanguageChange = (id, field, value) => {
    setLanguages(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : id))
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && !skills.includes(searchTerm) && skills.length < 10) {
      setSkills([...skills, searchTerm]);
      setSearchTerm(""); // Clear search input after adding the skill
      setLimitReached(false);
    } else if (skills.length >= 10) {
      setLimitReached(true); // Show message if 10 skills are reached
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({
      skills,
      languages: languages.map((l) => ({
        language: l.language,
        level: l.level,
      })),
    });
  };

  return (
    <div className="ml-2 mr-10">
      <div className="flex flex-col bg-white rounded-xl p-10 ml-10 maincontainer w-full max-w-7xl h-[calc(100vh-28px)]">
        <ProgressBar progress={progress} />

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

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-soft-liliac rounded-lg py-2 px-4 text-sm h-auto"
                  style={{ minWidth: "fit-content" }}
                >
                  <span className="text-xs text-dark-purple">{skill}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-sm mb-8 text-dark-purple">
              Add any languages you speak, and your level.
            </p>
            {languages.map((lang) => (
              <LanguageRow
                key={lang.id}
                formData={lang}
                onChange={(field, value) =>
                  handleLanguageChange(lang.id, field, value)
                }
                onDelete={() => handleDeleteLanguage(lang.id)}
              />
            ))}

            <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
              <button
                type="button"
                onClick={handleAddLanguage}
                className="text-light-purple border-pale-purple border-2 rounded-2xl px-3 py-2 hover:bg-pale-purple"
              >
                Add Language
              </button>
            </div>

            <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
              <button
                className="flex items-center justify-center h-input mt-4 py-6 px-1 rounded-3xl border-2 border-pale-purple"
                type="submit"
              >
                <div
                  className="flex items-center justify-center w-buttonSize h-input bg-dark-blue rounded-2xl border-5"
                  onClick={handleSubmit}
                >
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
  );
};

export default SkillsForm;
