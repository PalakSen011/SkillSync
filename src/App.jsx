import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import SignUp from "./screen/signUp/SignUp";
import SignIn from "./screen/signIn/SignIn";
import Home from "./pages/Home"; // Home component (layout)
import Dashboard from "./pages/Dashboard.jsx";
import UserManagement from "./pages/UserManagement"; // User management page
import AllCourses from "./pages/AllCourses.jsx"; // All courses page
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./utils/appStore";
import AddNewCourse from "./pages/AddNewCourse.jsx";

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
