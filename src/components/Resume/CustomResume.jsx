import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { sendRequest } from "../../utils/api.js";
import starsUnfilled from "../../assets/starsUnfilled.svg";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { ResumePreview } from "./ResumePreview.jsx";
import useResumeStore from "../../stores/resume/resumeStore.js";
import cloneDeep from "lodash/cloneDeep";
import useJobsStore from "../../stores/resume/jobsStore.js";
import { useNavigate } from "react-router-dom";

const CustomResume = () => {
  const location = useLocation();
  const originalResume = useResumeStore((state) => state.resume);
  const updateResume = useResumeStore((state) => state.updateResume);
  const initializeResume = useResumeStore((state) => state.initializeResume);
  const selectedJob = useJobsStore((state) => state.selectedJob);
  const setSelectedJob = useJobsStore((state) => state.setSelectedJob);
  const navigate = useNavigate();

  const [resume, setResume] = useState(cloneDeep(originalResume));

  const [downloading, setDownLoading] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState("");
  const [optimizationSuggestion, setOptimizationSuggestion] = useState("");
  const [highlightedSkills, setHighlightedSkills] = useState([]);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);

  const weights = {
    missing_keywords: 2,
    missing_skills: 3,
    experience_gaps: 5,
    grammar_issues: 1,
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const description = queryParams.get("description");
    if(description) {
      setJobDescription(description);
      console.log("Description from extension:", description);
    } else {
      //console.log("No description found in URL.");
    }
  }, [location.search]);

  useEffect(() => {
    if(localStorage.getItem("boardJobDescription")) {
      setJobDescription(localStorage.getItem("boardJobDescription"));
    } else {
      //console.log("No description found in localStorage.");
    }
  }, []);

  useEffect(() => {
    initializeResume();
  }, [initializeResume]);

  useEffect(() => {
    if(selectedJob) {
      window.scrollTo({ top: 0 });
      handleJobAnalyse(selectedJob?.description);
    }
  }, [location.state, setSelectedJob]);
  
  const calculateMatchingScore = () => {
    if(!analysisData || !analysisData.summary_of_issues) return 0;
    const { optimization_suggestions_count, missing_skills_count, total_issues_count } = analysisData.summary_of_issues;

    if(total_issues_count === 0) {
      return 100;
    }

    const safeMissingSkillsCount = Math.max(0, missing_skills_count);
    const safeOptimizationSuggestionsCount = Math.max(0, optimization_suggestions_count);

    const newScore =
      100 -
      (safeMissingSkillsCount * weights.missing_skills +
        safeOptimizationSuggestionsCount * weights.experience_gaps);

    return Math.max(0, Math.min(100, newScore));
  };

  const handleJobAnalyse = async (desc = jobDescription) => {
    setAnalysisData(null);
    setAnalysing(true);
    setShowAnalysisPanel(true);
    setShowPopup(false);

    if(!desc.trim()) {
      alert("Please enter a job description.");
      setAnalysing(false);
      return;
    }

    const payload = {
      resume_data: resume,
      job_description: desc,
    };

    try {
      const response = await sendRequest(payload, "/optimize-cv-for-job");
      setAnalysisData(response.resume_data);
      setAnalysing(false);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data.");
      setAnalysing(false);
    }
  };
  
  const handleSkillClick = (skill) => {
    if(!analysisData || !resume?.skills?.[0]?.list) return;
    const updatedMissingSkills = analysisData.missing_skills.hard_skills.filter(e => e !== skill);
    const updatedSkills = [...resume.skills[0].list, skill];
    
    setHighlightedSkills((prev) => [...prev, skill]);
    
    const newMissingSkillsCount = Math.max(0, analysisData.summary_of_issues.missing_skills_count - 1);
    const newTotalIssuesCount = Math.max(0, analysisData.summary_of_issues.total_issues_count - 1);

    setAnalysisData((prev) => ({
      ...prev,
      missing_skills: {
        ...prev.missing_skills,
        hard_skills: updatedMissingSkills,
      },
      summary_of_issues: {
        ...prev.summary_of_issues,
        missing_skills_count: newMissingSkillsCount,
        total_issues_count: newTotalIssuesCount,
      },
      matching_score: calculateMatchingScore(),
    }));

    const updatedResume = {
      ...resume,
      skills: [{ ...resume.skills[0], list: updatedSkills }],
    };
    setResume(updatedResume);
  };

  const handleExperienceAdd = async () => {
    if(selectedCompanies.length === 0) {
      alert("Please select at least one company and provide a description.");
      return;
    }

    const experienceWorked = selectedCompanies.map((company) => ({
      ...resume.experiences.find((exp) => exp.company === company.value.company),
    }));

    const payload = {
      experience_gap: optimizationSuggestion,
      exp_description: experienceWorked[0].description,
    };

    try {
      const response = await sendRequest(payload, "/add-experience");
      const updatedDescription = response.resume_data.experience_updated;

      const updatedResume = {
        ...resume,
        experiences: resume.experiences.map((exp) =>
          exp.company === selectedCompanies[0].value.company &&
          selectedCompanies[0].value.title === exp.title
            ? {
                ...exp,
                description: highlightAddedText(exp.description, updatedDescription),
              }
            : exp
        ),
      };

      updateResume(updatedResume);

      setAnalysisData((prev) => ({
        ...prev,
        optimization_suggestions: prev.optimization_suggestions.filter(
          (suggestion) => suggestion !== optimizationSuggestion
        ),
        summary_of_issues: {
          ...prev.summary_of_issues,
          experience_gaps_count: prev.summary_of_issues.optimization_suggestions_count - 1,
          total_issues_count: prev.summary_of_issues.total_issues_count - 1,
        },
        matching_score: calculateMatchingScore(),
      }));

      console.log("Experience added successfully:", response);
      toggleExperienceModal();
    } catch (error) {
      console.error("Error adding experiences:", error);
      alert("We had a problem adding your experience. Please try again.");
    }
  };

  const highlightAddedText = (originalText, updatedText) => {
    if(!originalText || !updatedText) return updatedText;

    const newText = updatedText.replace(originalText, "");

    return updatedText.replace(
      newText,
      `<span className="highlight">${newText}</span>`
    );
  };

  const handleRecruitersTips = (value, key) => {
    const updatedResume = {
      ...resume,
      job_summary: highlightAddedText("original text", analysisData.user_summary),
    };
  
    updateResume(updatedResume);
  
    setAnalysisData((prev) => ({
      ...prev,
      recruiters_tips: {
        ...prev.recruiters_tips,
        [key]: true,
      },
    }));
  };  

  const handleJobTitle = (job_title_match) => {
    if(job_title_match?.length > 0) {
      const updatedResume = {
        ...resume,
        title: highlightAddedText("original text", job_title_match),
      };
      updateResume(updatedResume);
    }
  
    setTimeout(() => {
      setAnalysisData((prev) => ({
        ...prev,
        job_title_match: "",
      }));
    }, 1000);
  };
  

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }
  const toggleExperienceModal = (role) => {
    setOptimizationSuggestion(role);
    setJobDescription("");
    setSelectedCompanies([]);
    setShowExperienceModal(!showExperienceModal);
  };

  const {
    matching_score = 0,
    keyword_analysis,
    missing_skills,
    experience_gaps,
    education_requirements,
    optimization_suggestions,
    customization_suggestions,
    searchability,
    job_title_match,
    recruiters_tips,
    preparation_assistance,
    grammar_corrections,
    summary_of_issues,
  } = analysisData || {};

  const strokeColor =
    matching_score < 30
      ? "#E74C3C"
      : matching_score > 65
      ? "#27AE60"
      : "#F2994A";

  const handleDownloadPDF = async () => {
    setDownLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/generate_resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_data: resume }),
      });

      if(!response.ok) {
        setDownLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("PDF generation response:", data);

      const base64Data = data.pdf_base64;

      // Decode the base64 string
      const binaryData = atob(base64Data);

      // Convert binary string to ArrayBuffer
      const byteNumbers = new Uint8Array(binaryData.length);
      for(let i = 0; i < binaryData.length; i++) {
        byteNumbers[i] = binaryData.charCodeAt(i);
      }

      // Create a Blob object
      const blob = new Blob([byteNumbers], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      navigate("/dashboard");
      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "my_updated_resume.pdf"; // Replace with desired filename
      link.click();

      // Revoke the URL to release memory
      URL.revokeObjectURL(url);

      window.open(selectedJob.job_url, "_blank");

      setDownLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setDownLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex sticky justify-end py-3 w-full px-6 gap-3 shadow bg-white top-0 z-10">
        <button onClick={togglePopup} className="relative flex items-center font-normal bg-white px-4 py-2 text-sm text-indigo-600 border-2 border-indigo-600 rounded-full">
          Tailor CV to a Job
        </button>
        <button onClick={() => {}} className="relative flex items-center font-normal bg-purple px-4 py-2 text-sm text-white rounded-full">
          Download Extension
        </button>
      </div>
      <div className="flex w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className={`transition-all duration-500 ease-in-out ${ showAnalysisPanel ? "w-[40%] opacity-100" : "w-0 opacity-0 overflow-hidden" } bg-gray-100 border-r-2 border-gray`}>
          {analysing ? (
            <div className="h-lvh w-full flex items-center justify-center gap-3">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-purple" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
              </div>
              Analysing CV...
            </div>
          ) : 
            <div className="p-7">
              {analysisData && (
                <>
                  {matching_score !== undefined && (
                    <div className="mt-5 text-center">
                      <h2 className="text-lg text-indigo-600 mb-2">Matching Score</h2>
                      <svg width="80"height="80"viewBox="0 0 36 36"className="inline-block"><circle cx="18" cy="18" r="16" stroke="#E0E0E0" strokeWidth="4" fill="none"></circle><circle cx="18" cy="18" r="16" strokeDasharray="100" strokeDashoffset={100 - matching_score} stroke={strokeColor} strokeWidth="4" fill="none" strokeLinecap="round"></circle>
                        <text x="50%" y="50%" textAnchor="middle" fill={strokeColor} fontSize="8px" dy=".3em">
                          {matching_score}
                          </text>
                      </svg>
                      <p>{summary_of_issues?.total_issues_count || 0} issues found</p>
                    </div>
                  )}
                  {job_title_match?.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Job Title Match
                      </h3>
                      <div className="flex">
                        <p>{job_title_match}</p>
                        <button
                          className="ml-2 mt-1 bg-indigo-600 text-white px-2 py-0 rounded-full text-xs flex items-center"
                          onClick={() => handleJobTitle(job_title_match)}
                        >
                          Add
                          <img src={starsUnfilled} alt="Stars Icon" className="w-[8px] h-[8px] ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                  {searchability && Object.keys(searchability).length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Searchability
                      </h3>
                      <ul className="list-none">
                        {Object.entries(searchability).map(([key, value], index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between mb-2"
                          >
                            <span>{key.replace(/_/g, " ")}</span>
                            <span
                              className={`ml-2 ${
                                value ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {value ? "Included" : "Missing"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {missing_skills?.hard_skills?.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Missing Skills
                      </h3>
                      <ul className="list-none">
                        {missing_skills.hard_skills.map((skill, index) => (
                          <li
                            key={`${skill}-${index}`}
                            className="flex items-center mb-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={`skill-${skill}`}
                              className="hidden"
                              onChange={() => handleSkillClick(skill)}
                            />
                            <label
                              htmlFor={`skill-${skill}`}
                              className="relative pl-8 text-sm cursor-pointer"
                            >
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-indigo-900 transition"></span>
                              {skill}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {education_requirements?.missing_degrees_or_certifications?.length >
                    0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Missing Degrees or Certifications
                      </h3>
                      <ul className="list-none">
                        {education_requirements.missing_degrees_or_certifications.map(
                          (degree, index) => (
                            <li key={index} className="mb-2 text-sm text-gray-600">
                              {degree}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {optimization_suggestions?.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Optimization Suggestions
                      </h3>
                      <ul className="list-none">
                        {optimization_suggestions.map((suggestion, index) => (
                          <div className="flex items-center mb-2" key={index}>
                            <li className="text-sm text-gray-600">{suggestion}</li>
                            <button
                              className="ml-2 bg-indigo-600 text-white px-3 py-0 rounded-full text-xs flex items-center"
                              onClick={() => toggleExperienceModal(suggestion)}
                            >
                              Add
                              <img
                                src={starsUnfilled}
                                alt="Stars Icon"
                                className="w-[8px] h-[8px] ml-1"
                              />
                            </button>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recruiters_tips && Object.keys(recruiters_tips).length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Recruiters' Tips
                      </h3>
                      <ul className="list-none">
                        {Object.entries(recruiters_tips).map(
                          ([key, value], index) => (
                            <div className="flex items-center mb-2" key={index}>
                              <li className="text-sm text-gray-600">
                                {"💡"} {key.replace(/_/g, " ")}
                              </li>
                              {key === "personal_summary" &&
                              resume?.job_summary ? null : (
                                <button
                                  className="ml-2 bg-indigo-600 text-white px-3 py-0 rounded-full text-xs flex items-center"
                                  onClick={() => handleRecruitersTips(value, key)}
                                >
                                  Add
                                  <img
                                    src={starsUnfilled}
                                    alt="Stars Icon"
                                    className="w-[8px] h-[8px] ml-1"
                                  />
                                </button>
                              )}
                            </div>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {grammar_corrections?.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Grammar Corrections
                      </h3>
                      <ul className="list-none">
                        {grammar_corrections.map((correction, index) => (
                          <li key={index} className="mb-2 text-sm text-gray-600">
                            ⚠ {correction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
              {showExperienceModal && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h3 className="mb-4 p-4 text-center text-2xl font-bold">
                      Where did you use this skill?
                    </h3>
                    <div className="mb-8 text-center">
                      <Select
                        id="companySelect"
                        options={
                          resume.experiences &&
                          resume.experiences.map((exp) => ({
                            value: exp,
                            label: exp.title + " at " + exp.company,
                          }))
                        }
                        isMulti // Enables multi-select
                        value={selectedCompanies}
                        onChange={(selected) => setSelectedCompanies(selected || [])}
                        placeholder="Select companies..."
                      />
                    </div>
                    <div className="popup-buttons">
                      <button className="upload-cv-btn" onClick={handleExperienceAdd}>
                        Add experience with AI{" "}
                        <img
                          src={starsUnfilled}
                          alt="Stars Icon"
                          className="ml-2 w-4 h-4"
                        />
                      </button>
                      <button
                        className="upload-cv-btn-cancel"
                        onClick={toggleExperienceModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
        <div className={`transition-all duration-500 ease-in-out flex flex-col p-5 items-center ${ showAnalysisPanel ? "w-[60%]" : "w-[100%]" } bg-gray-50`}>
          <div className="max-w-4xl">
            <ResumePreview readOnly={true} customResume={resume} />
          </div>

          {selectedJob && !analysing && (
            <div className="flex justify-end w-full py-4">
              <button onClick={() => handleDownloadPDF()} className="relative flex items-center font-normal bg-purple px-4 py-2 text-sm text-white rounded-full">
                Download and Apply
              </button>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Enter Job Description</h3>
            <textarea
              className="resize-none p-3 focus-visible:outline-none border-[1px] border-gray-300 my-3 rounded-md"
              disabled={analysing}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows="10"
              cols="50"
            />
            <div className="popup-buttons">
              <button disabled={analysing} className="upload-cv-btn disabled:opacity-50" onClick={() => handleJobAnalyse()}>
                {analysing ? 'Analizing...' : 'Analyse job'}
              </button>
              {!analysing &&
                <button className="upload-cv-btn-cancel" onClick={togglePopup}>
                  Cancel
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomResume;
