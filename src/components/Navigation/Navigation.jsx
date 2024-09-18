import React, { useState } from "react";
import logoDarkPurple from "../../assets/logoDarkPurple.svg";
import homepageIcon from "../../assets/homepageIcon.png";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import jobmatchIcon from "../../assets/jobmatchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`fixed top-2 left-4 bottom-2 flex flex-col items-center bg-white h-auto py-6 ${
        isExpanded ? "w-48" : "w-20"
      } transition-all duration-300 rounded-xl`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={logoDarkPurple} alt="Logo" className="h-10 w-10 mb-10" />
      <div className="flex flex-col items-center space-y-8">
        {/* Dashboard */}
        <div className="flex items-center space-x-4">
          <img src={homepageIcon} alt="Homepage" className="h-6 w-6" />
          {isExpanded && <span className="text-dark-blue">Dashboard</span>}
        </div>

        {/* Analytics */}
        <div className="flex items-center space-x-4">
          <img src={analyticsIcon} alt="Analytics" className="h-6 w-6" />
          {isExpanded && <span className="text-dark-blue">Analytics</span>}
        </div>

        {/* AI Job Match */}
        <div className="flex items-center space-x-4">
          <img src={jobmatchIcon} alt="AI Job Match" className="h-6 w-6" />
          {isExpanded && <span className="text-dark-blue">AI Job Match</span>}
        </div>

        {/* Settings */}
        <div className="flex items-center space-x-4 mt-auto">
          <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
          {isExpanded && <span className="text-dark-blue">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
