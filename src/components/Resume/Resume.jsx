import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { addUserData } from "../../utils/firebase.js";
import { uploadResume } from "./uploadResume.jsx";
import useResumeStore from "../../stores/resume/resumeStore";

const Resume = () => {
  const resume = useResumeStore((state) => state.resume);
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (resume && Object.keys(resume).length > 0) {
      navigate("/resume/edit");
    } else {
      console.log("No CV data found for the user.");
    }
  }, [resume, navigate]);

  const options = [
    {
      title: "From Scratch",
      description: "Use this option to build a new resume using our easy flow section by section",
      href: "/resume/edit",
    },
    {
      title: "Import your existing resume",
      description:
        "We'll fetch your data and autofill our resume builder tool, so you can review and edit any info.",
      action: "upload",
    },
  ];

  const handleFileUpload = async (e) => {
    try {
      setIsUploading(true);

      const userData = await uploadResume(e.target.files[0]);
      await addUserData(userData.uid, userData);
      setIsUploading(false);
      navigate("/resume/edit");
    } catch (error) {
      console.error("File upload failed:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-white rounded-lg overflow-hidden">
      {/* Full-screen Overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-purple" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
          <p className="text-lg font-semibold text-gray-700 mt-4">
            Importing and analyzing resume...
          </p>
        </div>
      )}

      <div className={`max-w-md ${isUploading ? "opacity-50 pointer-events-none" : ""}`}>
        <h1 className="text-3xl font-semibold mb-6">
          How would you like to create your resume?
        </h1>

        {/* Options */}
        <div className="space-y-4 w-full max-w-md">
          {options.map((option, index) =>
            option.action === "upload" ? (
              <label
                key={index}
                htmlFor="file-upload"
                className="w-full block text-start py-4 px-6 bg-white rounded-lg border border-gray-300 hover:border-purple focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <h2 className="text-md font-bold mb-1">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            ) : (
              <button
                key={index}
                className="w-full text-start py-4 px-6 bg-white rounded-lg border border-gray-300 hover:border-purple focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => navigate(option.href)}
                disabled={isUploading}
              >
                <h2 className="text-md font-bold mb-1">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
