import editIcon from "../../assets/editIcon.svg";
import useResumeStore from "../../stores/resume/resumeStore.js";
import { useEffect, useState } from "react";
import { addUserData } from "../../utils/firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ResumePreview = ({ readOnly = false, customResume }) => {
  const { resume, loadingResume } = useResumeStore();
  const resumeToUse = resume || customResume;
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [highlightedSkills, setHighlightedSkills] = useState([]);
  const [currentTab, setCurrentTab] = useState(new URLSearchParams(location.search).get("tab") || "contact");

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
  } = resumeToUse || {};

  const projects = resumeToUse?.projects?.filter(e => e.title) || [];

  useEffect(() => {
    // Update currentTab when the URL changes
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab") || "contact";
    setCurrentTab(tab);
    console.log("Tab updated:", tab);
  }, [location.search]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!resume.title || !resume.country) {
      toast.warning("Please fill job tittle and country");
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("tab", "contact");
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    } else {
      setLoading(true);
      try {
        await addUserData(user?.uid, user);
      } catch (error) {
        console.error("Error adding user data:", error);
      } finally {
        setLoading(false);
      }

      navigate("/dashboard", { state: { fetchJobsOnLoad: true } });
    }
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
      <div className="w-full relative min-h-full">
        {loadingResume ? (
          <div className="absolute w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-purple"></path></svg>
          </div>
        )
        : (
          <div id="resumePreview" className="pl-8 pr-8 text-gray-700 pt-6 py-8 overflow-y-auto bg-white border-2 border-dashed border-gray-300 rounded-lg">
            <h2 id="previewName" className="text-2xl font-bold text-indigo-600 mb-2">
              {`${resumeToUse?.first_name || ''} ${resumeToUse.last_name || ''}`}
            </h2>
            {title && (
              <p id="previewJobTitle" className="text-lg italic text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: title }}></p>
            )}
            {job_summary && (
              <p id="previewJobSummary" className="text-sm pb-4" dangerouslySetInnerHTML={{__html: resumeToUse?.job_summary ? resumeToUse.job_summary : "", }}></p>
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
            {skills[0]?.list?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-indigo-600 mb-3">Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {skills[0]?.list.map((skill, index) => (
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
        )}
      </div>
    </>
  )
}