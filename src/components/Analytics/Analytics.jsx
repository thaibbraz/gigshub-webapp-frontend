import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import "./styles.css";
import { sendRequest } from "../../utils/api.js";
import starsUnfilled from "../../assets/starsUnfilled.svg";
import editIcon from "../../assets/editIcon.svg";
import Select from "react-select";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Analytics = () => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [cvData, setCvData] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [jobDescription, setJobDescription] = useState("");
    const [analysisData, setAnalysisData] = useState(null);
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState("");
    const [optimizationSuggestion, setOptimizationSuggestion] = useState("");
    const [highlightedSkills, setHighlightedSkills] = useState([]);

    const weights = {
        missing_keywords: 2,
        missing_skills: 3,
        experience_gaps: 5,
        grammar_issues: 1,
    };

    useEffect(() => {
        fetchCV();
    }, []);
    const fetchCV = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.uid;
        if (!userId) {
            console.error("User ID is missing");
            return;
        }
        const data = await getUserCVData(userId);

        setCvData(data);
    };


    const calculateMatchingScore = () => {
        if (!analysisData || !analysisData.summary_of_issues) return 0;
        const { optimization_suggestions_count, missing_skills_count, total_issues_count} =
            analysisData.summary_of_issues;

        if (total_issues_count === 0) {
            return 100;
        }
        // Ensure no negative values
        const safeMissingSkillsCount = Math.max(0, missing_skills_count);

        const safeOptimizationSuggestionsCount = Math.max(0, optimization_suggestions_count);

        const newScore =
            100 -
            (
                safeMissingSkillsCount * weights.missing_skills +
                safeOptimizationSuggestionsCount * weights.experience_gaps);

        return Math.max(0, Math.min(100, newScore)); 
    };
    
    const handleJobAnalyse = async () => {
        setAnalysisData(null)
        setLoading(true);
        togglePopup();
        fetchCV();
        if (!jobDescription.trim()) {
            alert("Please enter a job description.");
            setLoading(false);
            return;
        }

        const payload = {
            resume_data: cvData,
            job_description: jobDescription,
        };

        try {
            const response = await sendRequest(payload, "/optimize-cv-for-job");
            console.log("Response from backend:", response);
            setAnalysisData(response.resume_data);
            setLoading(false);
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Failed to send data.");
            setLoading(false);
        }
    };

    const handleSkillClick = (skill) => {
        if (!analysisData || !cvData?.skills?.[0]?.list) return;

        const updatedMissingSkills = analysisData.missing_skills.hard_skills.filter((item) => item !== skill);

        const updatedSkills = [...cvData.skills[0].list, skill];

        setHighlightedSkills((prev) => [...prev, skill]);
        
         // Ensure counts never go below zero
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
        
        setCvData((prev) => ({
            ...prev,
            skills: [{ ...prev.skills[0], list: updatedSkills }],
        }));
    };

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

            setAnalysisData((prev) => ({
                ...prev,
                experience_gaps: {
                    unrepresented_roles: prev.experience_gaps.unrepresented_roles.slice(1),
                },
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
        setJobDescription("");
        setOptimizationSuggestion("");
        setSelectedCompanies([]);
    };

    const highlightAddedText = (originalText, updatedText) => {
        if (!originalText || !updatedText) return updatedText;

        const newText = updatedText.replace(originalText, "");

        return updatedText.replace(newText, `<span class="highlight">${newText}</span>`);
    };

    const handleRecruitersTips = (value, key) => {

            setCvData((prevCvData) => ({
                ...prevCvData,
                job_summary: highlightAddedText("original text",analysisData.user_summary),
            }));


        setAnalysisData((prev) => ({
            ...prev,
            recruiters_tips: {
                ...prev.recruiters_tips,
                [key]: true,
            },
        }));
    };

    const handleJobTitle = (job_title_match) => {
        if (job_title_match?.length > 0) {
            setCvData((prevCvData) => ({
                ...prevCvData,
                jobTitle: highlightAddedText("original text",analysisData.job_title_match),
            }));
        }

        setTimeout(() => {
            setAnalysisData((prev) => ({
                ...prev,
                job_title_match: {
                    ...prev.job_title_match,
                    job_title_match: "",
                },
            }));
        }, 1000);
    };

    const togglePopup = () => setShowPopup(!showPopup);
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
    } = cvData || {};

    const strokeColor =
        matching_score < 30 ? "#E74C3C" : matching_score > 65 ? "#27AE60" : "#F2994A";
    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
        const element = document.getElementById("resumePreview");
        if (element) {
            element.contentEditable = !isEditing;
            element.focus();
            }
        };
        
        const handleDownloadPDF = async () => {
            try {
              const resumeElement = document.getElementById("resumePreview");
          
              if (!resumeElement) {
                console.error("Resume element not found");
                return;
              }
          
              // Use html2canvas to render the content of the resume
              const canvas = await html2canvas(resumeElement, { scale: 2 });
              const imgData = canvas.toDataURL("image/png");
          
              // Create a jsPDF instance
              const pdf = new jsPDF("p", "mm", "a4");
              const pdfWidth = 210; // A4 width in mm
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale the content
          
              const pageHeight = 297; // A4 page height in mm
              let currentHeight = 0; // Track the current height in the PDF
          
              // Add the first page
              pdf.addImage(imgData, "PNG", 0, currentHeight, pdfWidth, pdfHeight);
          
              currentHeight += pdfHeight;
          
              // Check if content overflows and add pages
              while (currentHeight > pageHeight) {
                const remainingHeight = currentHeight - pageHeight;
          
                // Add a new page
                pdf.addPage();
          
                // Shift the content to fit the remaining part of the canvas
                const canvasSection = await html2canvas(resumeElement, {
                  scale: 2,
                  y: remainingHeight, // Capture only the remaining part of the content
                });
                const sectionImgData = canvasSection.toDataURL("image/png");
                pdf.addImage(sectionImgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          
                currentHeight -= pageHeight;
              }
          
              // Download the PDF
              pdf.save("my_updated_resume.pdf");
            } catch (error) {
              console.error("Error generating PDF:", error);
            }
          };
        
    return (
        <div className="App">
            <div className="container">
                <div className="sidebar">
                    <div className="btn-tailor-job-box">
                        <button className="upload-cv-btn-ghost" onClick={togglePopup}>
                            <span>Tailor CV to a Job</span>
                        </button>
                    </div>
    {loading && <div className="loading-spinner-container">
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
                            <li key={`${skill}-${index}`} className="clickable-skill">
                                <input
                                    type="checkbox"
                                    id={`skill-${skill}`}
                                    onChange={() => handleSkillClick(skill)}
                                />
                                <label htmlFor={`skill-${skill}`}>{skill}</label>
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
                            </li>
                            {key === "personal_summary" && cvData?.job_summary ? (
                                <></>
                            ):
                            (<button
                                    className="ml-2 experence-btn"
                                    onClick={() => handleRecruitersTips(value, key)}
                                >
                                    Add
                                    <img
                                        src={starsUnfilled}
                                        alt="Stars Icon"
                                        className="ml-1 mr-1 w-2 h-2"
                                    />
                                </button>)}
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
                        <button className="upload-cv-btn" onClick={handleJobAnalyse}>
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
                        
                        <div className="">
                        
                        <h2 className="text-dark-blue text-2xl font-extrabold">Preview CV</h2>
                        
                       
                        </div>
                        <button className="upload-cv-btn" onClick={handleDownloadPDF}>
                            <span>Download pdf</span>
                        </button>
                        
                    </div>
                    <div className="content-box">
                    <div className="flex justify-end">
                            <img
                            src={editIcon}
                            alt="Edit Icon"
                            className="h-6 w-6 cursor-pointer"
                            onClick={handleEditClick}
                            />
                        </div>
                        <div id="resumePreview">
                            <h2 id="previewName">{cvData? `${cvData["first name"]} ${cvData["last name"]}`: ""}</h2>
                            <p id="previewJobTitle" dangerouslySetInnerHTML={{ __html: jobTitle }}></p>
                            <p id="previewJobSummary" dangerouslySetInnerHTML={{ __html: cvData?.job_summary ? cvData.job_summary : "" }} className="pb-2"></p>
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
                                <ul className="skills-list">
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
