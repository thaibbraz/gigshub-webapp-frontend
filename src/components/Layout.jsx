import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="flex bg-off-white min-h-screen">
      {/* Sidebar */}
      {!isAuthPage && <Navigation />}

      {/* Page content */}
      <div className={`flex-grow p-8 pb-2 mt-8 ${isAuthPage ? "w-full" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}
