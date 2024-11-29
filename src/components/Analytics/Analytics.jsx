import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import './styles.css';
import { sendRequest } from "../../utils/api.js";

const Analytics = () => {
    const [cvData, setCvData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [analysisData, setAnalysisData] = useState(null);

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
            
            //const response = await axios.post("/api/send-resume", payload);
            setAnalysisData(response.resume_data);
            alert("Data sent successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Failed to send data.");
        }
    };

    if (!cvData) {
        return <p>Loading CV data...</p>; // Show a loading message while fetching data
    }
    const togglePopup = () => setShowPopup(!showPopup);
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
        summary_of_issues
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
        skills = []
    } = cvData;

    return (
        <div className="App">
            <div className="container">
                <div className="sidebar">
                    <div className="btn-tailor-job-box">
                    <button className="upload-cv-btn-ghost" onClick={togglePopup}>
                        <span>Tailor to job</span>
                    </button>
                    </div>
                    {analysisData && (
        <>
            <div className="matching-score">
                <h2>Matching Score</h2>
                <div className="score-circle">
                    <span>{matching_score}</span>
                </div>
                <p>{summary_of_issues?.total_issues_count || 0} issues found</p>
            </div>

            {/* Job Title Match */}
            <div className="section">
                <h3>Job Title Match</h3>
                <p>{job_title_match || "No job title provided"}</p>
            </div>

            {/* Searchability */}
            <div className="section">
                <h3>Searchability</h3>
                <ul>
                    {Object.entries(searchability || {}).map(([key, value], index) => (
                        <li key={index}>
                            {value ? "✔" : "⚠"} {key.replace(/_/g, " ")}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Missing Keywords */}
            <div className="section">
                <h3>Missing Keywords</h3>
                <ul>
                    {keyword_analysis?.missing_keywords?.map((keyword, index) => (
                        <li key={index}>⚠ {keyword}</li>
                    ))}
                </ul>
            </div>

            {/* Missing Skills */}
            <div className="section">
                <h3>Missing Skills</h3>
                <ul>
                    {missing_skills?.hard_skills?.map((skill, index) => (
                        <li key={index}>⚠ {skill}</li>
                    ))}
                </ul>
            </div>

            {/* Experience Gaps */}
            <div className="section">
                <h3>Experience Gaps</h3>
                <ul>
                    {experience_gaps?.unrepresented_roles?.map((role, index) => (
                        <li key={index}>⚠ {role}</li>
                    ))}
                </ul>
            </div>

            {/* Education Requirements */}
            <div className="section">
                <h3>Missing Degrees or Certifications</h3>
                <ul>
                    {education_requirements?.missing_degrees_or_certifications?.map(
                        (degree, index) => (
                            <li key={index}>⚠ {degree}</li>
                        )
                    )}
                </ul>
            </div>

            {/* Optimization Suggestions */}
            <div className="section">
                <h3>Optimization Suggestions</h3>
                <ul>
                    {optimization_suggestions?.map((suggestion, index) => (
                        <li key={index}>✔ {suggestion}</li>
                    ))}
                </ul>
            </div>

            {/* Customization Suggestions */}
            <div className="section">
                <h3>Customization Suggestions</h3>
                <ul>
                    {customization_suggestions?.map((suggestion, index) => (
                        <li key={index}>✔ {suggestion}</li>
                    ))}
                </ul>
            </div>

            {/* Recruiters' Tips */}
            <div className="section">
                <h3>Recruiters' Tips</h3>
                <ul>
                    {Object.entries(recruiters_tips || {}).map(([key, value], index) => (
                        <li key={index}>
                            {value ? "✔" : "⚠"} {key.replace(/_/g, " ")}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Preparation Assistance */}
            <div className="section">
                <h3>Preparation Assistance</h3>
                <h4>Interview Questions</h4>
                <ul>
                    {preparation_assistance?.interview_questions?.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}
                </ul>
                <h4>Preparation Checklist</h4>
                <ul>
                    {preparation_assistance?.preparation_checklist?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Grammar Corrections */}
            <div className="section">
                <h3>Grammar Corrections</h3>
                <ul>
                    {grammar_corrections?.map((correction, index) => (
                        <li key={index}>⚠ {correction}</li>
                    ))}
                </ul>
            </div>
        </>
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
                                        Send
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
                                        <p>{exp.description}</p>
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
                                    {skills?.[0]?.list.map((skill, index) => (
                                        <li key={index}>{skill}</li>
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
