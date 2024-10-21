import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forms from "./components/Forms/Forms";
import UserDashboard from "./components/Dashboard/subComponents/UserDashboard";
import Dashboard from "./components/Dashboard/subComponents/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import AIJobMatch from "./components/AI Job Match/AIJobMatch";
import Settings from "./components/Profile Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/forms" element={<Forms />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-job-match" element={<AIJobMatch />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
