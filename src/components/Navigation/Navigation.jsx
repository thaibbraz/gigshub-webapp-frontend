import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDarkPurple from "../../assets/logoDarkPurple.svg";
import homepageIcon from "../../assets/homepageIcon.png";
import homepageIconLight from "../../assets/homepageIconLight.svg";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import analyticsIconDark from "../../assets/analyticsIconDark.svg";
import jobmatchIcon from "../../assets/jobmatchIcon.svg";
import jobmatchIconDark from "../../assets/jobmatchIconDark.svg";
import settingsIcon from "../../assets/settingsIcon.svg";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleClick = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  return (
    <div
      className={`fixed top-2 left-4 bottom-2 flex flex-col ${
        isExpanded ? "items-start pl-4" : "items-center"
      } bg-white h-auto py-6 ${
        isExpanded ? "w-48" : "w-24"
      } transition-all duration-300 rounded-xl`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col space-y-8 h-full w-full">
        <div
          className={`flex ${
            isExpanded ? "justify-start" : "justify-center"
          } items-center space-x-4`}
        >
          <img src={logoDarkPurple} alt="Logo" className="h-10 w-10" />
        </div>
        <div
          className={`flex ${
            isExpanded ? "justify-start" : "justify-center"
          } items-center space-x-4 cursor-pointer`}
          onClick={() => handleClick("dashboard")}
        >
          <img
            src={activePage === "dashboard" ? homepageIcon : homepageIconLight}
            alt="Homepage"
            className="h-6 w-6"
          />
          {isExpanded && (
            <span
              className={`font-small font-sans ${
                activePage === "dashboard"
                  ? "text-dark-blue"
                  : "text-light-liliac"
              }`}
            >
              Dashboard
            </span>
          )}
        </div>
        <div
          className={`flex ${
            isExpanded ? "justify-start" : "justify-center"
          } items-center space-x-4 cursor-pointer`}
          onClick={() => handleClick("analytics")}
        >
          <img
            src={activePage === "analytics" ? analyticsIconDark : analyticsIcon}
            alt="Analytics"
            className="h-6 w-6"
          />
          {isExpanded && (
            <span
              className={`font-small font-sans ${
                activePage === "analytics"
                  ? "text-dark-blue"
                  : "text-light-liliac"
              }`}
            >
              Analytics
            </span>
          )}
        </div>
        <div
          className={`flex ${
            isExpanded ? "justify-start" : "justify-center"
          } items-center space-x-4 cursor-pointer`}
          onClick={() => handleClick("ai-job-match")}
        >
          <img
            src={
              activePage === "ai-job-match" ? jobmatchIconDark : jobmatchIcon
            }
            alt="AI Job Match"
            className="h-6 w-6"
          />
          {isExpanded && (
            <span
              className={`font-small font-sans ${
                activePage === "ai-job-match"
                  ? "text-dark-blue"
                  : "text-light-liliac"
              }`}
            >
              AI Job Match
            </span>
          )}
        </div>

        <div className="flex-grow"></div>
        <div className="w-10/12 border-t border-light-liliac opacity-30 mx-auto"></div>
        <div
          className={`flex ${
            isExpanded ? "justify-start" : "justify-center"
          } items-center space-x-4 cursor-pointer pb-2`}
          onClick={() => handleClick("settings")}
        >
          <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
          {isExpanded && (
            <span
              className={`font-small font-sans ${
                activePage === "settings"
                  ? "text-dark-blue"
                  : "text-light-purple"
              }`}
            >
              Settings
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;