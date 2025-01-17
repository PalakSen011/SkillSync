import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import SignUp from "./components/auth/signUp/SignUp";
import SignIn from "./components/auth/signIn/SignIn";
import Home from "./components/home/Home"; // Home component (layout)
import Dashboard from "./components/home/dashboard/Dashboard.jsx";
import UserManagement from "./components/home/userManegement/UserManagement"; // User management page
import AllCourses from "./components/home/allCourses/AllCourses.jsx"; // All courses page
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./utils/appStore";
import AddNewCourse from "./components/home/allCourses/AddNewCourse.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addnewcourse" element={<AddNewCourse />} />

            {/* Home route with nested routes */}
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="all-courses" element={<AllCourses />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
