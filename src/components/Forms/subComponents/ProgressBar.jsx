import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-12/12 h-3 bg-white rounded-lg mb-6 ml-2">
      <div
        className="absolute h-4 bg-lime-green rounded-lg transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
