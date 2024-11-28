import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import './styles.css';

const Analytics = () => {
    const [cvData, setCvData] = useState(null);

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

    if (!cvData) {
        return <p>Loading CV data...</p>; // Show a loading message while fetching data
    }

    const {
        jobTitle,
        first_name: firstName,
        last_name: lastName,
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
                    <div className="matching-score">
                        <h2>Matching Score</h2>
                        <div className="score-circle">
                            <span>75</span>
                        </div>
                        <p>8 issues found</p>
                    </div>
                    <div className="section">
                        <h3>Job Title Match</h3>
                        <p>{jobTitle}</p>
                        <a href="#" className="apply-all">apply all</a>
                    </div>
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
