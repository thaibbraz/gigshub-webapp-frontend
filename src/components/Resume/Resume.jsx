import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { getUserCVData } from "../../utils/firebase.js";

const Resume = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "From Scratch",
      description: "Use this option to build a new resume using our easy flow section by section",
      href: "/resume/edit",
    },
    {
      title: "Import your existing resume",
      description: "We'll fetch your data and autofill our resume builder tool, so you can review and edit any info.",
      href: "/resume/edit"
    },
  ];

  const fetchCV = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;
    if(!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      const data = await getUserCVData(userId);
      if(data) {
        navigate("/resume/edit");
      } else {
        console.log("No CV data found for the user.");
      }
    } catch (error) {
      console.error("Error fetching CV data:", error);
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-[1496px] bg-white rounded-lg border overflow-hidden">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold mb-6">How would you like to create your resume?</h1>
        <div className="space-y-4 w-full max-w-md">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full text-start py-4 px-6 bg-white rounded-lg border border-gray-300 hover:border-purple focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => navigate(option.href)}
            >
              <h2 className="text-md font-bold mb-1">{option.title}</h2>
              <p className="text-sm text-gray-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
