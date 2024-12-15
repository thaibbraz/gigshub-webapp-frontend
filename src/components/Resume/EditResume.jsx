import React from "react";
import "./styles.css";
import ResumeCreator from "./ResumeCreator.jsx";
import { ResumePreview } from "./ResumePreview.jsx";

const EditResume = () => {
  return (
    <div className="flex w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-[40%]">
        <ResumeCreator />
      </div>
      <div className="w-[60%] p-5 bg-gray-50">
        <ResumePreview />
      </div>
    </div>
  );
};

export default EditResume;
