import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forms from "./components/Forms/Forms";
import UserDashboard from "./components/Dashboard/subComponents/UserDashboard";
import Dashboard from "./components/Dashboard/subComponents/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import AIJobMatch from "./components/AI Job Match/AIJobMatch";
import Explanation from "./components/Explanation/Explanation";
import Settings from "./components/Profile Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const sampleData = {
    jobTitle: "software engineer",
    location: "Spain",
    "first name": "Zoe",
    "last name": "Laventhol",
    email: "zoe.lavethol@gmail.com",
    phone: "1234567",
    linkedin: "fenfjewr",
    github: "xcvbnm",
    website: "qwerty",
    ethnicity: "white",
    gender: "female",
    lgbtq: "bi",
    authorization: "",
    sponsorship: "",
    address: "",
    city: "Oakland",
    state: "CA",
    zip: "",

    experiences: [
      {
        title: "Climate Programs Director",
        date: "July 2019 – July 2021",
        company: "Bay Area Community Resources",
        location: "El Cerrito, California, USA",
        description:
          "Led 50% program growth and increased retention by 14%, and supported launch of a second program California Climate Action Corps with the Governor's office, for over 60 participants. Managed over 50 Fellows placed in over 30 climate projects across California. Streamlined operations through automation in Salesforce and other tools, saving significant staff time.",
      },
      { company: "Bay Area Community Resources", date: "Se…" },
    ],

    education: [
      {
        date: "December 2022",
        degree: "Certificate in Ful…",
        institution: "asdfgh",
        major: "qwerty",
      },
      { date: "September 2015", degree: "Bachelor of Arts …" },
    ],

    skills: ["Python", "C", "Java"],
    languages: [
      { language: "English", level: "native" },
      { language: "Portuguese", level: "advanced" },
      { language: "Spanish", level: "advanced" },
    ],

    projects: [],
  };
  const [formData, setFormData] = useState(sampleData);

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
            <Route path="/signup" element={<Signup />} />

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
                element={<UserDashboard formData={formData} />}
              />
              <Route path="/jobs" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/welcome" element={<Explanation />} />
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
