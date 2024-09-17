import React from "react";
import { Outlet } from "react-router-dom";
// import { Navigation } from "./Navigation/Navigation"; // need to change it

export default function Layout() {
  return (
    <div className="bg-off-white">
      {/* <Navigation /> */}
      <Outlet />
    </div>
  );
}

// Here is the page layout. Outlet is the content that varies.
