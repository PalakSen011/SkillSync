import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { appStore, persistor } from "./Store/appStore";

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
} from "./Constants/RouteConstants";

import { ProtectedRoute, NotFound } from "./Common";

import Dashboard from "./Components/dashboard/Dashboard";
import UserManagement from "./Components/UserManegement/UserManagement";
import { SignIn, SignUp } from "./Components/Auth";
import { CourseList, AddNewCourse, CourseDetails } from "./Components/Courses";

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
              <Route path={PATH_COURSE_DETAIL} element={<CourseDetails />} />
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
