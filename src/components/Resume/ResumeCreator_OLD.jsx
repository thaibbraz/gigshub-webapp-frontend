import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import starsUnfilled from '../../assets/starsUnfilled.svg';

const ResumeCreator = ({ 
  loading, 
  analysisData, 
  cvData, 
  experiences, 
  handleJobTitle, 
  handleSkillClick, 
  toggleExperienceModal,
  handleRecruitersTips,
  handleExperienceAdd,
  handleJobAnalyse
}) => {
  const [showPopup, setShowPopup] = useState(!!cvData);
  const [jobDescription, setJobDescription] = useState('');
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [optimizationSuggestion, setOptimizationSuggestion] = useState('');

  const togglePopup = () => setShowPopup(!showPopup);

  const { 
    matching_score, 
    summary_of_issues, 
    job_title_match, 
    searchability, 
    missing_skills, 
    education_requirements, 
    optimization_suggestions, 
    recruiters_tips, 
    grammar_corrections 
  } = analysisData || {};

  const strokeColor = matching_score >= 80 ? '#4CAF50' : matching_score >= 60 ? '#FFA500' : '#FF0000';

  return (
    <div className="w-[45%] border-gray-300 overflow-y-auto sticky top-0">
      <div className="flex justify-end">
        <button onClick={togglePopup} className="relative h-[30px] flex items-center font-normal bg-white px-4 py-2 text-sm text-indigo-600 border-2 border-indigo-600 rounded-full shadow-[0_0_0_4px_white,0_0_0_6px_rgb(208,208,255)] cursor-pointer">
          <span>Tailor CV to a Job</span>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-4 border-t-indigo-600 rounded-full animate-spin mb-2"></div>
          <p className="text-indigo-600 font-bold">Loading...</p>
        </div>
      )}

      {analysisData && (
        <>
          {matching_score !== undefined && (
            <div className="mt-5 text-center">
              <h2 className="text-lg text-indigo-600 mb-2">Matching Score</h2>
              <svg width="80" height="80" viewBox="0 0 36 36" className="inline-block">
                <circle cx="18" cy="18" r="16" stroke="#E0E0E0" strokeWidth="4" fill="none"></circle>
                <circle cx="18" cy="18" r="16" strokeDasharray="100" strokeDashoffset={100 - matching_score} stroke={strokeColor} strokeWidth="4" fill="none" strokeLinecap="round"></circle>
                <text x="50%" y="50%" textAnchor="middle" fill={strokeColor} fontSize="8px" dy=".3em">{matching_score}</text>
              </svg>
              <p>{summary_of_issues?.total_issues_count || 0} issues found</p>
            </div>
          )}

          {job_title_match?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Job Title Match</h3>
              <div className="flex">
                <p>{job_title_match}</p>
                <button className="ml-2 mt-1 bg-indigo-600 text-white px-2 py-0 rounded-full text-xs flex items-center" onClick={() => handleJobTitle(job_title_match)}>
                  Add
                  <img src={starsUnfilled} alt="Stars Icon" className="w-[8px] h-[8px] ml-1" />
                </button>
              </div>
            </div>
          )}

          {searchability && Object.keys(searchability).length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Searchability</h3>
              <ul className="list-none">
                {Object.entries(searchability).map(([key, value], index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    <span>{key.replace(/_/g, " ")}</span>
                    <span className={`ml-2 ${value ? "text-green-600" : "text-red-600"}`}>
                      {value ? "Included" : "Missing"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {missing_skills?.hard_skills?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Missing Skills</h3>
              <ul className="list-none">
                {missing_skills.hard_skills.map((skill, index) => (
                  <li key={`${skill}-${index}`} className="flex items-center mb-2 cursor-pointer">
                    <input type="checkbox" id={`skill-${skill}`} className="hidden" onChange={() => handleSkillClick(skill)} />
                    <label htmlFor={`skill-${skill}`} className="relative pl-8 text-sm cursor-pointer">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-indigo-900 transition"></span>
                      {skill}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {education_requirements?.missing_degrees_or_certifications?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Missing Degrees or Certifications</h3>
              <ul className="list-none">
                {education_requirements.missing_degrees_or_certifications.map((degree, index) => (
                  <li key={index} className="mb-2 text-sm text-gray-600">{degree}</li>
                ))}
              </ul>
            </div>
          )}

          {optimization_suggestions?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Optimization Suggestions</h3>
              <ul className="list-none">
                {optimization_suggestions.map((suggestion, index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <li className="text-sm text-gray-600">{suggestion}</li>
                    <button className="ml-2 bg-indigo-600 text-white px-3 py-0 rounded-full text-xs flex items-center" onClick={() => toggleExperienceModal(suggestion)}>
                      Add
                      <img src={starsUnfilled} alt="Stars Icon" className="w-[8px] h-[8px] ml-1" />
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {recruiters_tips && Object.keys(recruiters_tips).length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Recruiters' Tips</h3>
              <ul className="list-none">
                {Object.entries(recruiters_tips).map(([key, value], index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <li className="text-sm text-gray-600">
                      {"💡"} {key.replace(/_/g, " ")}
                    </li>
                    {key === "personal_summary" && cvData?.job_summary ? null : (
                      <button className="ml-2 bg-indigo-600 text-white px-3 py-0 rounded-full text-xs flex items-center" onClick={() => handleRecruitersTips(value, key)}>
                        Add
                        <img src={starsUnfilled} alt="Stars Icon" className="w-[8px] h-[8px] ml-1" />
                      </button>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}

          {grammar_corrections?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Grammar Corrections</h3>
              <ul className="list-none">
                {grammar_corrections.map((correction, index) => (
                  <li key={index} className="mb-2 text-sm text-gray-600">⚠ {correction}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {showExperienceModal && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="mb-4 p-4 text-center text-2xl font-bold">Where did you use this skill?</h3>
            <div className="mb-8 text-center">
              <Select
                id="companySelect"
                options={experiences && experiences.map((exp) => ({
                  value: exp,
                  label: exp.title + " at " + exp.company,
                }))}
                isMulti
                value={selectedCompanies}
                onChange={(selected) => setSelectedCompanies(selected || [])}
                placeholder="Select companies..."
              />
            </div>
            <div className="popup-buttons">
              <button className="upload-cv-btn" onClick={handleExperienceAdd}>
                Add experience with AI <img src={starsUnfilled} alt="Stars Icon" className="ml-2 w-4 h-4" />
              </button>
              <button className="upload-cv-btn-cancel" onClick={() => setShowExperienceModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Enter Job Description</h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows="10"
              cols="50"
            />
            <div className="popup-buttons">
              <button className="upload-cv-btn" onClick={handleJobAnalyse}>Analyse job</button>
              <button className="upload-cv-btn-cancel" onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCreator;