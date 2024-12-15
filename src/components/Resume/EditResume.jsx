import React, { useEffect, useState } from "react";
import { getUserCVData } from "../../utils/firebase.js";
import "./styles.css";
import { sendRequest } from "../../utils/api.js";
import editIcon from "../../assets/editIcon.svg";
import { useLocation } from "react-router-dom";
import ResumeCreator from "./ResumeCreator.jsx";
import { ResumePreview } from "./ResumePreview.jsx";

const EditResume = () => {
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
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

  return (
    <div className="flex w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-[40%]">
        <ResumeCreator cvData={cvData} />
      </div>
      <div className="w-[60%] p-5 bg-gray-50">
        <ResumePreview cvData={cvData} />
      </div>
    </div>
  );
};

export default EditResume;
