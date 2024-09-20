import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forms from "./components/Forms/Forms";
import UserDashboard from "./components/Dashboard/subComponents/UserDashboard";
import Dashboard from "./components/Dashboard/subComponents/Dashboard";
import Analytics from "./components/Analytics/Analytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
