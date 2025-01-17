import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import SignUp from "./components/auth/signUp/SignUp";
import SignIn from "./components/auth/signIn/SignIn";
import Dashboard from "./components//dashboard/Dashboard.jsx";
import UserManagement from "./components//userManegement/UserManagement"; // User management page
import AllCourses from "./components//allCourses/AllCourses.jsx"; // All courses page
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./utils/appStore";
import AddNewCourse from "./components//allCourses/AddNewCourse.jsx";
import ResetPassword from "./components/auth/signIn/ResetPasswordForm.jsx";
import ProtectedRoute from "./Common/ProtectedRoute.jsx";
import NotFound from "./Common/NotFound.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route index element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/all-courses/addNew-course" element={<AddNewCourse />} />
              <Route path="user-management" element={<UserManagement />} />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
            {/* <Route path="/addnewcourse" element={<AddNewCourse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/all-courses" element={<AllCourses />} /> */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
