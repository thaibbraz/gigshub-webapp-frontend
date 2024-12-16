import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forms from "./components/Forms/Forms";
import UserDashboard from "./components/Dashboard/subComponents/UserDashboard";
import Dashboard from "./components/Dashboard/subComponents/Dashboard";
import Resume from "./components/Resume/Resume";
import AIJobMatch from "./components/AI Job Match/AIJobMatch";
import Explanation from "./components/Explanation/Explanation";
import Settings from "./components/Profile Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import EditResume from "./components/Resume/EditResume";
import CustomResume from "./components/Resume/CustomResume";
import useResumeStore from "./stores/resume/resumeStore";

function App() {
  const [formData, setFormData] = useState({});
  const initializeResume = useResumeStore((state) => state.initializeResume);

  useEffect(() => {
    initializeResume();
  }, [initializeResume]);
  
  const handleFormDataChange = (data) => {
    setFormData(data);
  };
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />

            {/* only available to logged-in users */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/forms"
                element={
                  <Forms
                    formData={formData}
                    onSetFormData={handleFormDataChange}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={<UserDashboard />}
              />
              <Route path="/jobs" element={<Dashboard />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/resume/edit" element={<EditResume />} />
              <Route path="/welcome" element={<Explanation />} />
              <Route path="/custom-cv" element={<CustomResume />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
