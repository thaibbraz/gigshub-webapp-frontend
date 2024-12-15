import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import "./styles.css";
import { sendRequest } from "../../utils/api.js";
import editIcon from "../../assets/editIcon.svg";
import { useLocation } from "react-router-dom";
import ResumeCreator from "./ResumeCreator.jsx";

const EditResume = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [highlightedSkills, setHighlightedSkills] = useState([]);
  const location = useLocation();

  const weights = {
    missing_keywords: 2,
    missing_skills: 3,
    experience_gaps: 5,
    grammar_issues: 1,
  };

  useEffect(() => {
    fetchCV();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const description = queryParams.get("description");
    if (description) {
      setJobDescription(description);
      console.log("Description from extension:", description);
    } else {
      console.log("No description found in URL.");
    }
  }, [location.search]);
  const fetchCV = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    const data = await getUserCVData(userId);

    if (data) {
      setCvData(data);
      setShowPopup(true);
    }
  };

  const {
    matching_score = 0,
    missing_skills,
    education_requirements,
    optimization_suggestions,
    searchability,
    job_title_match,
    recruiters_tips,
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
  } = cvData || {};

  const strokeColor =
    matching_score < 30
      ? "#E74C3C"
      : matching_score > 65
      ? "#27AE60"
      : "#F2994A";
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
    const element = document.getElementById("resumePreview");
    if (element) {
      element.contentEditable = !isEditing;
      element.focus();
    }
  };

  const handleDownloadPDF = async () => {
    console.log("Downloading PDF...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/generate_resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume_data: cvData }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("PDF generation response:", data);

      const base64Data = data.pdf_base64;
      const binaryData = atob(base64Data);

      const byteNumbers = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteNumbers[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteNumbers], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "my_updated_resume.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-[40%]">
        <ResumeCreator cvData={cvData} />
      </div>
      <div className="w-[60%] p-5 bg-gray-50">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-indigo-900">
              Preview CV
            </h2>
            <p className="text-sm text-gray-600" style={{ fontSize: "13px" }}>
              This isn’t the resume style.
            </p>
            <p className="text-sm text-gray-600" style={{ fontSize: "13px" }}>
              Our pdf style is made to pass any ATS system
            </p>
          </div>
          <button
            className="relative h-[30px] flex items-center font-normal bg-indigo-600 px-7 py-2 text-sm text-white rounded-full shadow-[0_0_0_4px_white,0_0_0_6px_rgb(208,208,255)] cursor-pointer"
            onClick={handleDownloadPDF}
          >
            <span>Download CV</span>
          </button>
        </div>
        <div className="w-full max-h-[1200px] overflow-y-auto bg-white border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex justify-end p-4">
            <img
              src={editIcon}
              alt="Edit Icon"
              className="h-6 w-6 cursor-pointer"
              onClick={handleEditClick}
            />
          </div>
          <div id="resumePreview" className="pl-8 pr-8 text-gray-700">
            <h2
              id="previewName"
              className="text-2xl font-bold text-indigo-600 mb-2"
            >
              {cvData ? `${cvData["first name"]} ${cvData["last name"]}` : ""}
            </h2>
            <p
              id="previewJobTitle"
              className="text-lg italic text-gray-500 mb-4"
              dangerouslySetInnerHTML={{ __html: jobTitle }}
            ></p>
            <p
              id="previewJobSummary"
              className="text-sm pb-4"
              dangerouslySetInnerHTML={{
                __html: cvData?.job_summary ? cvData.job_summary : "",
              }}
            ></p>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-indigo-600 mb-3">
                Contact Information
              </h3>
              <p className="text-sm mb-2">{email}</p>
              <p className="text-sm mb-2">{phone}</p>
              <p className="text-sm mb-2">{linkedin}</p>
              <p className="text-sm mb-2">{github}</p>
              <p className="text-sm">{address}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-indigo-600 mb-3">
                Experience
              </h3>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm font-semibold">
                    {exp.title}{" "}
                    <span className="text-gray-500">
                      {exp.date === "undefined - undefined" || exp.date}
                    </span>
                  </p>
                  <p className="text-sm italic text-gray-600">{exp.company}</p>
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  ></p>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-indigo-600 mb-3">
                Education
              </h3>
              {education.map((edu, index) => (
                <p key={index} className="text-sm mb-2">
                  <strong>{edu.degree}</strong> - {edu.institution}{" "}
                  {edu.date === "undefined - undefined" || edu.date}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-600 mb-3">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {cvData?.skills?.[0]?.list.map((skill, index) => (
                  <li
                    key={index}
                    className={`px-2 py-1 rounded bg-gray-200 text-sm ${
                      highlightedSkills.includes(skill)
                        ? "bg-indigo-100 text-indigo-600 font-bold"
                        : ""
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResume;
