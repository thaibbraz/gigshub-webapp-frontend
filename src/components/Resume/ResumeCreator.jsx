import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ResumeCreatorContact from "./ResumeCreator/ResumeCreatorContact";
import ResumeCreatorExperience from "./ResumeCreator/ResumeCreatorExperience";
import ResumeCreatorProjects from "./ResumeCreator/ResumeCreatorProjects.jsx";
import ResumeCreatorEducation from "./ResumeCreator/ResumeCreatorEducation.jsx";
import ResumeCreatorSkills from "./ResumeCreator/ResumeCreatorSkills.jsx";

const ResumeCreator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "contact");

  const tabs = [
    { id: "contact", label: "CONTACT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "education", label: "EDUCATION" },
    { id: "skills", label: "SKILLS" },
  ];

  const handleTabClick = (tabId) => {
    const params = new URLSearchParams(searchParams);
    if(tabId !== "experience") params.delete("exp");
    if(tabId !== "projects") params.delete("project");
    if(tabId !== "education") params.delete("edu");
    setSearchParams(params);
    setActiveTab(tabId);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", activeTab);
    setSearchParams(params);
  }, [activeTab, setSearchParams, searchParams]);

  return (
    <div className="h-full p-6">
      <h1 className="text-2xl font-semibold mb-4">Resume 1</h1>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-2 py-1 rounded-md text-xs ${
              activeTab === tab.id
                ? "bg-purple text-white"
                : "bg-indigo-100 text-purple"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "contact" && <ResumeCreatorContact />}
      {activeTab === "experience" && <ResumeCreatorExperience />}
      {activeTab === "projects" && <ResumeCreatorProjects />}
      {activeTab === "education" && <ResumeCreatorEducation />}
      {activeTab === "skills" && <ResumeCreatorSkills />}

    </div>
  );
};

export default ResumeCreator;
