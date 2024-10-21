import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={`flex min-h-screen ${
        isAuthPage ? "bg-bright-purple" : "bg-off-white"
      }`}
    >
      {/* Sidebar */}
      {!isAuthPage && <Navigation />}

      {/* Page content */}
      <div
        className={`flex-grow p-8 pt-0 pb-2 mt-8 w-[90%] ${
          isAuthPage ? "w-full" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
