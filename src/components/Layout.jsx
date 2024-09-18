import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  return (
    <div className="flex bg-off-white min-h-screen">
      {/* Sidebar */}
      <Navigation />

      {/* Page content */}
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
}
