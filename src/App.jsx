import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { appStore, persistor } from "./Store/appStore.js";

import {
  PATH_SIGNIN,
  PATH_SIGNUP,
  PATH_DASHBOARD,
  PATH_RESET_PASSWORD,
  PATH_COURSES,
  PATH_ADD_NEW_COURSE,
  PATH_USER_MANAGEMENT,
  PATH_COURSE_DETAIL,
  PATH_EDIT_COURSE,
} from "./Constants/RouteConstants.js";

import ProtectedRoute from "./Common/ProtectedRoute.jsx";
import NotFound from "./Common/NotFound.jsx";

import SignUp from "./Components/Auth/signUp/SignUp";
import SignIn from "./Components/Auth/SignIn/SignIn.jsx";
import Dashboard from "./Components/dashboard/Dashboard.jsx";
import UserManagement from "./Components/UserManegement/UserManagement.jsx";
import AddNewCourse from "./Components/Courses/AddNewCourse.jsx";
import CourseList from "./Components/Courses/CourseList.jsx";
import CourseDetail from "./Components/Courses/CourseDetails.jsx";

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path={PATH_SIGNIN} element={<SignIn />} />
            <Route path={PATH_SIGNUP} element={<SignUp />} />
            <Route path={PATH_RESET_PASSWORD} element={<SignIn />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={PATH_DASHBOARD} element={<Dashboard />} />
              <Route path={PATH_USER_MANAGEMENT} element={<UserManagement />} />
              <Route path={PATH_COURSES} element={<CourseList />} />
              <Route path={PATH_ADD_NEW_COURSE} element={<AddNewCourse />} />
              <Route path={PATH_COURSE_DETAIL} element={<CourseDetail />} />
              <Route path={PATH_EDIT_COURSE} element={<AddNewCourse />} />
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
