import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import "./styles.css";
import { sendRequest } from "../../utils/api.js";
import starsUnfilled from "../../assets/starsUnfilled.svg";
import Select from "react-select";

const Analytics = () => {
    const [loading, setLoading] = useState(false);
    const [cvData, setCvData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [analysisData, setAnalysisData] = useState(null);
    const [showExperienceModal, setShowExperienceModal] = useState(false); 
    const [selectedCompanies, setSelectedCompanies] = useState("");
    const [optimizationSuggestion, setOptimizationSuggestion] = useState("");
    const [highlightedSkills, setHighlightedSkills] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.uid;
        const fetchCV = async () => {
            if (!userId) {
                console.error("User ID is missing");
                return;
            }
            const data = await getUserCVData(userId);
            setCvData(data);
        };

        fetchCV();
    }, []);

    const handleSendToBackend = async () => {
        togglePopup();
        setLoading(true);
        if (!jobDescription.trim()) {
            alert("Please enter a job description.");
            return;
        }

        const payload = {
            resume_data: cvData,
            job_description: jobDescription,
        };

        try {
            const response = await sendRequest(payload, "/optimize-cv-for-job");
            console.log("Response from backend:", response);
            setLoading(false);
            setAnalysisData(response.resume_data);
            
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Failed to send data.");
        }
    };
    const handleSkillClick = (skill) => {
        if (!analysisData || !cvData?.skills?.[0]?.list) return;
        const updatedMissingSkills = analysisData.missing_skills.hard_skills.filter(
            (item) => item !== skill
        );

        // Add the skill to cvData.skills.list
        const updatedSkills = [...cvData.skills[0].list, skill];
        
        setHighlightedSkills((prev) => [...prev, skill]);
        // Update state
        setAnalysisData((prev) => ({
            ...prev,
            missing_skills: {
                ...prev.missing_skills,
                hard_skills: updatedMissingSkills,
            },
        }));

        setCvData((prev) => ({
            ...prev,
            skills: [{ ...prev.skills[0], list: updatedSkills }],
        }));
    };

    

    if (!cvData) {
        return <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
        </div>; 
    }
    
    const togglePopup = () => setShowPopup(!showPopup);
    const toggleExperienceModal = (role) => {
        setOptimizationSuggestion(role)
        setJobDescription("");
        setSelectedCompanies([]);
        setShowExperienceModal(!showExperienceModal)
    }
    const {
        matching_score,
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
        change_log,
        summary_of_issues,
    } = analysisData || {};

    const {
        jobTitle,
        email,
        phone,
        linkedin,
        github,
        address,
        experiences = [],
        education = [],
        skills = [],
    } = cvData;
    const strokeColor =
    matching_score < 30
      ? "#E74C3C"
      : matching_score > 65
      ? "#27AE60"
      : "#F2994A";


        const handleExperienceAdd = async () => {
            if (selectedCompanies.length === 0) {
                alert("Please select at least one company and provide a description.");
                return;
            }
            const experienceWorked = selectedCompanies.map((company) => ({
                ...cvData.experiences.find((exp) => exp.company === company.value.company),
            }));
        
            const payload = {
                experience_gap: optimizationSuggestion,
                exp_description: experienceWorked[0].description,
            };
        
            try {
                const response = await sendRequest(payload, "/add-experience");
                const updatedDescription = response.resume_data.experience_updated;
        
                setCvData((prevState) => ({
                    ...prevState,
                    experiences: prevState.experiences.map((exp) =>
                        exp.company === selectedCompanies[0].value.company && selectedCompanies[0].value.title === exp.title
                            ? {
                                ...exp,
                                description: highlightAddedText(exp.description, updatedDescription),
                            }
                            : exp
                    ),
                }));
        
                console.log("Experience added successfully:", response);
                alert("Experiences added successfully!");
                toggleExperienceModal();
            } catch (error) {
                console.error("Error adding experiences:", error);
                alert("Failed to add experiences.");
            }
            setJobDescription("");
            setOptimizationSuggestion("");
            setSelectedCompanies([]);
        };
        
        // Helper Function to Highlight Added Text
        const highlightAddedText = (originalText, updatedText) => {
            if (!originalText || !updatedText) return updatedText;
        
            // Find the new text by comparing the updated text with the original
            const newText = updatedText.replace(originalText, "");
            
            // Highlight the new text
            return updatedText.replace(newText, `<span class="highlight">${newText}</span>`);
        };
        const handleRecruitersTips = (value) => {
            if (value === false) {
                setCvData((prevCvData) => ({
                    ...prevCvData,
                    job_summary: analysisData.user_summary, 
                }));
            }
        };
        const handleJobTitle = (job_title_match) => {
            console.log("Job title match:", job_title_match,job_title_match.length, typeof job_title_match);
            
            if (job_title_match?.length > 0) {
                setCvData((prevCvData) => ({
                    ...prevCvData,
                    jobTitle: analysisData.job_title_match, 
                }));
            }
        };
        
        
    return (
        <div className="App">
            <div className="container">
                <div className="sidebar">
                    <div className="btn-tailor-job-box">
                        <button className="upload-cv-btn-ghost" onClick={togglePopup}>
                            <span>Tailor cv to a job</span>
                        </button>
                    </div>
    {loading && analysisData === null && <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
    </div>}
    {analysisData && (
        <>
          {/* Matching Score */}
            {matching_score !== undefined && (
                <div className="matching-score">
                    <h2>Matching Score</h2>
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 36 36"
                        className="score-circle"
                    >
                        {/* Background circle */}
                        <circle
                        cx="18"
                        cy="18"
                        r="16"
                        stroke="#E0E0E0"
                        strokeWidth="4"
                        fill="none"
                        ></circle>

                        {/* Dynamic progress circle */}
                        <circle
                        cx="18"
                        cy="18"
                        r="16"
                        strokeDasharray="100"
                        strokeDashoffset={100 - matching_score}
                        stroke={strokeColor}
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        ></circle>

                        {/* Text in the middle */}
                        <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        fill={strokeColor}
                        fontSize="8px"
                        dy=".3em"
                        >
                        {matching_score}
                        </text>
                    </svg>
                    <p>{summary_of_issues?.total_issues_count || 0} issues found</p>
                </div>
            )}

            {/* Job Title Match 
            
            <button className="match-btn" onClick={() => toggleExperienceModal(job_title_match)}> - Apply
                            </button>
                            */}
            {job_title_match && job_title_match?.length > 0 && (
                <div className="section">
                    <h3>Job Title Match</h3>
                        <div className="flex">
                            <p>{job_title_match}</p>
                            <button className="experence-btn ml-2 mt-1" onClick={() => handleJobTitle(job_title_match)}>Add
                                <img
                                src={starsUnfilled}
                                alt="Stars Icon"
                                className="w-2 h-2"
                                /></button>
                        </div>
                </div>
            )}

            {/* Searchability */}
            {searchability && Object.keys(searchability).length > 0 && (
                <div className="section">
                    <h3>Searchability</h3>
                    <ul>
                        {Object.entries(searchability).map(([key, value], index) => (
                            <li key={index} >
                                {key.replace(/_/g, " ")} 
                                <span className="ml-2" style={{ color: value ? "#13BC4B" : "#FF1212" }}>
                                    {value ? "Included" : "Missing"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

                {/* Missing Skills */}
                {missing_skills?.hard_skills?.length > 0 && (
                <div className="section">
                    <h3>Missing Skills</h3>
                    <ul>
                        {missing_skills.hard_skills.map((skill, index) => (
                            <li key={index} className="clickable-skill">
                                <input
                                    type="checkbox"
                                    id={`skill-${index}`}
                                    onChange={() => handleSkillClick(skill)}
                                />
                                <label htmlFor={`skill-${index}`}>{skill}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Experience Gaps 
            {experience_gaps?.unrepresented_roles?.length > 0 && (
                <div className="section">
                    <h3>Experience Gaps</h3>
                    <ul>
                        {
                        experience_gaps.unrepresented_roles.map((role, index) => (
                            <div className="flex">
                                <li className="mr-2" key={index}> {role}</li>
                                <button className="experence-btn" onClick={() => toggleExperienceModal(role)}>Add
                                <img
                                src={starsUnfilled}
                                alt="Stars Icon"
                                className="w-2 h-2"
                                /></button>
                            </div>
                        ))} 
                    </ul>
                </div>
            )}
        */}
            {/* Education Requirements */}
            {education_requirements?.missing_degrees_or_certifications?.length > 0 && (
                <div className="section">
                    <h3>Missing Degrees or Certifications</h3>
                    <ul>
                        {education_requirements.missing_degrees_or_certifications.map(
                            (degree, index) => (
                                <li key={index}> {degree}</li>
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* Optimization Suggestions */}
            {optimization_suggestions?.length > 0 && (
                <div className="section">
                    <h3>Optimization Suggestions</h3>
                    <ul>
                        {optimization_suggestions.map((suggestion, index) => (
                            <div className="flex">
                                <li key={index}>{suggestion}</li>
                                <button className="experence-btn" onClick={() => toggleExperienceModal(suggestion)}>Add
                                <img
                                src={starsUnfilled}
                                alt="Stars Icon"
                                className="ml-1 mr-1 w-2 h-2"
                                /></button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}


            {/* Recruiters' Tips */}
            {recruiters_tips && Object.keys(recruiters_tips).length > 0 && (
                <div className="section">
                    <h3>Recruiters' Tips</h3>
                    <ul>
                        {Object.entries(recruiters_tips).map(([key, value], index) => (
                            <div className="flex"><li key={index}>
                                {value ? "✔" : "⚠"} {key.replace(/_/g, " ")}
                            </li><button className="ml-2 experence-btn" onClick={() => handleRecruitersTips(value)}>Add
                                <img
                                src={starsUnfilled}
                                alt="Stars Icon"
                                className="ml-1 mr-1 w-2 h-2"
                                /></button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {/* Preparation Assistance */}
            {preparation_assistance?.interview_questions?.length > 0 || preparation_assistance?.preparation_checklist?.length > 0 && (
                    <div className="section">
                    <h3>Preparation Assistance</h3>
                    {preparation_assistance?.interview_questions?.length > 0 && (
                        <>
                            <h4>Interview Questions</h4>
                            <ul>
                                {preparation_assistance.interview_questions.map((question, index) => (
                                    <li key={index}>{question}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {preparation_assistance?.preparation_checklist?.length > 0 && (
                        <>
                            <h4>Preparation Checklist</h4>
                            <ul>
                                {preparation_assistance.preparation_checklist.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}

            {/* Grammar Corrections */}
            {grammar_corrections?.length > 0 && (
                <div className="section">
                    <h3>Grammar Corrections</h3>
                    <ul>
                        {grammar_corrections.map((correction, index) => (
                            <li key={index}>⚠ {correction}</li>
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
                                    label: exp.title +" at " +exp.company,
                                }))}

                                
                                isMulti // Enables multi-select
                                value={selectedCompanies}
                                onChange={(selected) => setSelectedCompanies(selected || [])}
                                placeholder="Select companies..."
                            />
                            { /*<select
                                id="companySelect"
                                value={selectedCompanies}
                                onChange={(e) => setSelectedCompanies(e.target.value)}
                            >
                                <option value="">-- Select a Company --</option>
                                {experiences && experiences.map((exp, index) => (
                                    <option key={index} value={exp.company}>
                                        {exp.company}
                                    </option>
                                ))}
                            </select>*/}
                        </div>
                        <div className="popup-buttons">
                            <button className="upload-cv-btn" onClick={handleExperienceAdd}>
                                Add experience with AI <img
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
                        <button className="upload-cv-btn" onClick={handleSendToBackend}>
                            Analyse job
                        </button>
                        <button className="upload-cv-btn-cancel" onClick={togglePopup}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
                </div>

                <div className="main-content">
                    <div className="download-cv-button-box">
                        <h2>Optimized Resume</h2>
                        <button className="upload-cv-btn">
                            <span>Download pdf</span>
                        </button>
                    </div>
                    <div className="content-box">
                        <div id="resumePreview">
                            <h2 id="previewName">{`${cvData["first name"]} ${cvData["last name"]}`}</h2>
                            <p id="previewJobTitle">{jobTitle}</p>
                            <p id="previewJobSummary" className="pb-2">{cvData?.job_summary ? cvData.job_summary : ""}</p>
                            <div className="preview-section">
                                <h3>Contact Information</h3>
                                <p id="previewEmail">{email}</p>
                                <p id="previewPhone">{phone}</p>
                                <p id="previewLinkedIn">{linkedin}</p>
                                <p id="previewGitHub">{github}</p>
                                <p id="previewAddress">{address}</p>
                            </div>
                            <div className="experiences-original-section">
                                <h3>Experience</h3>
                                {experiences.map((exp, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>{exp.title}</strong> <span>{exp.date === "undefined - undefined" ? "" : exp.date}</span>
                                        </p>
                                        <p><em>{exp.company}</em></p>
                                        <p dangerouslySetInnerHTML={{ __html: exp.description }}></p>
                                    </div>
                                ))}
                            </div>
                            <div className="education-original-section">
                                <h3>Education</h3>
                                {education.map((edu, index) => (
                                    <p key={index}>
                                        <strong>{edu.degree}</strong> - {edu.institution} {edu.date || ""}
                                    </p>
                                ))}
                            </div>
                            <div className="preview-section">
                                <h3>Skills</h3>
                                <ul>
                                    {cvData?.skills?.[0]?.list.map((skill, index) => (
                                        <li key={index}>
                                            <span className={highlightedSkills.includes(skill) ? "highlight" : ""}>
                                                {skill}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
