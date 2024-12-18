import editIcon from "../../assets/editIcon.svg";
import useResumeStore from "../../stores/resume/resumeStore.js";
import { useState } from "react";
import { addUserData } from "../../utils/firebase.js";
import { useNavigate } from "react-router-dom";

export const ResumePreview = ({ readOnly = false }) => {
  const resume = useResumeStore((state) => state.resume);
  const navigate = useNavigate();
  const [highlightedSkills, setHighlightedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    title,
    job_summary,
    email,
    phone,
    linkedin,
    github,
    address,
    experiences = [],
    education = [],
    skills = {}
  } = resume || {};

  const projects = resume?.projects?.filter(e => e.title) || [];

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    await addUserData(user?.uid, user);
    setLoading(false);
    navigate("/dashboard", { state: { fetchJobsOnLoad: true } });
  };

  /*const handleDownloadPDF = async () => {
    console.log("Downloading PDF...");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/generate_resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume_data: resume }),
        }
      );
      if(!response.ok) {
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
  };*/
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-indigo-900">
            Preview CV
          </h2>
          <p className="text-sm text-gray-600" style={{ fontSize: "13px" }}>
            This isn't the resume style.
          </p>
          <p className="text-sm text-gray-600" style={{ fontSize: "13px" }}>
            Our pdf style is made to pass any ATS system
          </p>
        </div>
        {!readOnly && (
          <button
            className="disabled:opacity-75 h-[30px] flex items-center font-normal bg-indigo-600 px-7 py-2 text-sm text-white rounded-full shadow-[0_0_0_4px_white,0_0_0_6px_rgb(208,208,255)] cursor-pointer"
            disabled={loading}
            onClick={() => handleSubmit()}
          >
            {loading ? "Saving..." : "Complete and Save"}
          </button>
        )}
      </div>
      <div className="w-full max-h-[1200px] overflow-y-auto bg-white border-2 border-dashed border-gray-300 rounded-lg">
        <div id="resumePreview" className="pl-8 pr-8 text-gray-700 pt-6 py-8">
          <h2 id="previewName" className="text-2xl font-bold text-indigo-600 mb-2">
            {`${resume?.first_name || ''} ${resume.last_name || ''}`}
          </h2>
          {title && (
            <p id="previewJobTitle" className="text-lg italic text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: title }}></p>
          )}
          {job_summary && (
            <p id="previewJobSummary" className="text-sm pb-4" dangerouslySetInnerHTML={{__html: resume?.job_summary ? resume.job_summary : "", }}></p>
          )}
          {(email || phone || linkedin || github) && (
            <div className="border-b-[1px] border-gray-300 mb-4 pb-4">
              <h3 className="text-lg font-bold text-indigo-600 mb-3">
                Contact Information
              </h3>
              <p className="text-sm mb-2">{email}</p>
              <p className="text-sm mb-2">{phone}</p>
              <p className="text-sm mb-2">{linkedin}</p>
              <p className="text-sm mb-2">{github}</p>
              <p className="text-sm">{address}</p>
            </div>
          )}
          {experiences?.length > 0 && (
            <div className="border-b-[1px] border-gray-300 mb-4">
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
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: exp.description }}></p>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div className="border-b-[1px] border-gray-300 mb-4">
              <h3 className="text-lg font-bold text-indigo-600 mb-3">
                Projects
              </h3>
              {projects.map((proj, index) => (
                <div key={index} className="mb-4">
                  <div className="text-sm font-semibold">
                    {proj.title}{" "}
                  </div>
                  <a href={proj.url} target="_blank" className="underline text-xs text-purple">
                    {proj.url}
                  </a>
                  <p className="text-sm mt-3" dangerouslySetInnerHTML={{ __html: proj.description }}></p>
                </div>
              ))}
            </div>
          )}
          {education?.length > 0 && (
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
          )}
          {skills?.list?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-indigo-600 mb-3">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {resume?.skills?.[0]?.list.map((skill, index) => (
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
          )}
        </div>
      </div>
    </>
  )
}