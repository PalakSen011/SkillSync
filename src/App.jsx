import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { appStore, persistor } from "./Store/appStore.js";

import SignUp from "./Components/auth/signUp/SignUp";
import SignIn from "./Components/Auth/SignIn/SignIn.jsx";
import Dashboard from "./Components/dashboard/Dashboard.jsx";
import UserManagement from "./Components/UserManegement/UserManagement.jsx";
import AddNewCourse from "./Components/Courses/AddNewCourse.jsx";
import CourseList from "./Components/Courses/CourseList.jsx";
import CourseDetail from "./Components/Courses/CourseDetails.jsx";
import ProtectedRoute from "./Common/ProtectedRoute.jsx";
import NotFound from "./Common/NotFound.jsx";

import {
  PATH_SIGNUP,
  PATH_DASHBOARD,
  PATH_RESET_PASSWORD,
  PATH_COURSES,
  PATH_ADD_NEW_COURSE,
  PATH_USER_MANAGEMENT,
  PATH_COURSE_DETAIL,
} from "./Constants/RouteConstants.js";

// const uidb64 = "VVJNbkZXcw";
// const token = "ad35dd2d13c5572a3884d82f8d5bd726f9bba59e";
const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path={PATH_SIGNUP} element={<SignUp />} />
            <Route
              path="/reset-password"
              element={<SignIn />}
            />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={PATH_DASHBOARD} element={<Dashboard />} />
              <Route path={PATH_USER_MANAGEMENT} element={<UserManagement />} />
              <Route path={PATH_COURSES} element={<CourseList />} />
              <Route path={PATH_ADD_NEW_COURSE} element={<AddNewCourse />} />

              <Route path={PATH_COURSE_DETAIL} element={<CourseDetail />} />
              <Route path="/edit-course/:courseId" element={<AddNewCourse />} />
              {/* Add CourseDetail route */}
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
