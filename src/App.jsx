import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
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
