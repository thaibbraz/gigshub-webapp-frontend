import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoDarkPurple from "../../assets/logoDarkPurple.svg";
import homepageIcon from "../../assets/homepageIcon.svg";
import homepageIconLight from "../../assets/homepageIconLight.svg";
import analyticsIcon from "../../assets/analyticsIcon.svg";
import analyticsIconDark from "../../assets/analyticsIconDark.svg";

import sparklesIcon from "../../assets/sparklesIcon.svg";
import sparklesIconDark from "../../assets/sparklesIconDark.svg";

import settingsIcon from "../../assets/settingsIcon.svg";
import settingsIconDark from "../../assets/settingsIconDark.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import logoutIconDark from "../../assets/logoutIconDark.svg";
import { useAuth } from "../../context/AuthContext";

const Navigation = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState();
  const [logoutHover, setLogoutHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navClass = `top-2 left-4 bottom-2 flex flex-col h-full transition-all items-center bg-off-white ${location.pathname === "/dashboard" ? "h-6/6" : "h-auto"} w-24 transition-all duration-300 rounded-xl`

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

  const handleLogout = async () => {
    
    localStorage.removeItem("user");
    logout();
    try {
      const extensionId = process.env.REACT_APP_EXTENSION_ID;
      // Send both ID token and refresh token to the Chrome extension
      await window.chrome.runtime.sendMessage(extensionId, {
        action: "logout",
      });
    } catch (error) {
      console.error("Error sending message to extension:", error);
    }
    navigate("/login");
  };

  return (
    <div>
      <div className={navClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex flex-col items-center fixed space-y-3 h-full py-6">
          <div className="grow flex flex-col gap-4">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <img src={logoDarkPurple} alt="Logo" className="h-10 w-10" />
            </div>
            <div className="cursor-pointer relative w-8 h-8">
              <div onClick={() => handleClick("dashboard")} className="absolute left-0 flex items-center justify-start px-2 py-1 -mx-2 -my-1 w-auto max-w-10 overflow-hidden transition-all duration-300 hover:max-w-[300px] hover:shadow-md hover:rounded-full hover:pe-4 hover:bg-white">
                <div className="min-w-9 w-9 h-8 flex items-center justify-center">
                  <img src={activePage === "dashboard" ? homepageIcon : homepageIconLight} alt="Homepage" className="h-5 w-5" />
                </div>
                <span className={`font-small uppercase m-0 font-bold overflow-hidden text-nowrap transition-all ${activePage === "userdashboard" || activePage === "dashboard" ? "text-dark-blue" : "text-light-liliac"}`}>
                  My Dashboard
                </span>
              </div>
            </div>
            <div className="cursor-pointer relative w-8 h-8">
              <div onClick={() => handleClick("resume")} className="absolute left-0 flex items-center justify-start px-2 py-1 -mx-2 -my-1 w-auto max-w-10 overflow-hidden transition-all duration-300 hover:max-w-[300px] hover:shadow-md hover:rounded-full hover:pe-4 hover:bg-white">
                <div className="min-w-9 w-9 h-8 flex items-center justify-center">
                  <img src={activePage === "resume" ? analyticsIconDark : analyticsIcon} alt="Analytics" className="h-5 w-5" />
                </div>
                <span className={`font-small uppercase m-0 font-bold overflow-hidden text-nowrap transition-all} ${ activePage === "resume" ? "text-dark-blue" : "text-light-liliac"}`}>
                  Resume builder
                </span>
              </div>
            </div>
            <div className="cursor-pointer relative w-8 h-8">
              <div onClick={() => handleClick("custom-cv")} className="absolute left-0 flex items-center justify-start px-2 py-1 -mx-2 -my-1 w-auto max-w-10 overflow-hidden transition-all duration-300 hover:max-w-[300px] hover:shadow-md hover:rounded-full hover:pe-4 hover:bg-white">
                <div className="min-w-9 w-9 h-8 flex items-center justify-center">
                  <img src={activePage === "custom-cv" ? sparklesIconDark : sparklesIcon} alt="sparkles" className="h-5 w-5" />
                </div>
                <span className={`font-small uppercase m-0 font-bold overflow-hidden text-nowrap transition-all} ${ activePage === "custom-cv" ? "text-dark-blue" : "text-light-liliac"}`}>
                Tailor CV
                </span>
              </div>
            </div>
          </div>
          <div className="w-10/12 border-t border-light-liliac opacity-30 mx-auto"></div>
          
          <div className="cursor-pointer relative w-8 h-8">
            <div onClick={() => handleClick("settings")} className="absolute left-0 flex items-center justify-start px-2 py-1 -mx-2 -my-1 w-auto max-w-10 overflow-hidden transition-all duration-300 hover:max-w-[300px] hover:shadow-md hover:rounded-full hover:pe-4 hover:bg-white">
              <div className="min-w-9 w-9 h-8 flex items-center justify-center">
                <img src={activePage === "settings" ? settingsIconDark : settingsIcon} alt="Settings" className="h-6 w-6" />
              </div>
              <span className={`font-small uppercase m-0 font-bold overflow-hidden text-nowrap transition-all} ${ activePage === "resume" ? "text-dark-blue" : "text-light-liliac"}`}>
                Settings
              </span>
            </div>
          </div>
          <div className="cursor-pointer relative w-8 h-8">
            <div onClick={() => handleLogout()} onMouseEnter={() => setLogoutHover(true)} onMouseLeave={() => setLogoutHover(false)} className="absolute left-0 flex items-center justify-start px-2 py-1 -mx-2 -my-1 w-auto max-w-10 overflow-hidden transition-all duration-300 hover:max-w-[300px] hover:shadow-md hover:rounded-full hover:pe-4 hover:bg-white">
              <div className="min-w-9 w-9 h-8 flex items-center justify-center">
                <img src={logoutHover ? logoutIconDark : logoutIcon} alt="Logout" className="h-6 w-6" />
              </div>
              <span className={`font-small uppercase m-0 font-bold overflow-hidden text-nowrap transition-all} ${ activePage === "resume" ? "text-dark-blue" : "text-light-liliac"}`}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

// h-[calc(65vh-28px)]
