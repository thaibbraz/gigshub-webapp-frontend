import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <>
      <div
        className={`flex min-h-screen ${
          isAuthPage ? "bg-[#3F33C0]" : "bg-white"
        }`}
      >
        {/* Sidebar */}
        {!isAuthPage && <Navigation />}

        {/* Page content */}
        <div
          className={`flex-grow ${
            isAuthPage ? "w-full" : isDashboardPage ? "mt-6" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
