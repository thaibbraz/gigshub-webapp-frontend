import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forms from "./components/Forms/Forms";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forms" element={<Forms />} />
          {/* <Route path="/" index element={<Home />} />
          <Route path="/freelancers" element={<Freelancers />} />
          <Route path="/jobSeekers" element={<JobSeekers />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsOfService" element={<TermsOfService />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
