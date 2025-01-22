import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./App.css";

// Store
import { appStore, persistor } from "./Store/appStore.js";

// Components
import SignUp from "./Components/auth/signUp/SignUp";
import SignIn from "./Components/auth/signIn/SignIn";
import ResetPassword from "./Components/auth/signIn/ResetPasswordForm.jsx";
import Dashboard from "./Components/dashboard/Dashboard.jsx";
import UserManagement from "./Components/UserManegement/UserManagement.jsx";
import AddNewCourse from "./Components/Courses/AddNewCourse.jsx";
import CourseList from "./Components/Courses/CourseList.jsx";
import ProtectedRoute from "./Common/ProtectedRoute.jsx";
import NotFound from "./Common/NotFound.jsx";

// Constants
import {
  PATH_SIGNUP,
  PATH_DASHBOARD,
  PATH_RESET_PASSWORD,
  PATH_COURSES,
  PATH_ADD_NEW_COURSE,
  PATH_USER_MANAGEMENT,
} from "./Constants/RouteConstants.js";

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SignIn />} />
            <Route path={PATH_SIGNUP} element={<SignUp />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={PATH_DASHBOARD} element={<Dashboard />} />
              <Route path={PATH_USER_MANAGEMENT} element={<UserManagement />} />
              <Route path={PATH_COURSES} element={<CourseList />} />
              <Route path={PATH_ADD_NEW_COURSE} element={<AddNewCourse />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
