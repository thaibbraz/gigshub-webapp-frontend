import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isDashboardPage = location.pathname === "/dashboard";

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
        className={`flex-grow pb-2 w-[90%] ${
          isAuthPage ? "w-full" : isDashboardPage ? "mt-6" : "p-8 mt-8"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
