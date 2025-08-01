// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";
import PrivateRoute from "./routes/PrivateRoute";
import JobDetails from "./pages/JobDetails";

import MyApplicationsPage from "./pages/MyApplicationsPage";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/jobs" element={<JobsPage />} />

          {/* 🔒 Profile is now protected */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/jobs/:id" element={<JobDetails />} />
          
          <Route path="/my-applications" element={<MyApplicationsPage />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
