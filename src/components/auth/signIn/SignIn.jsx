import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../../assets/logo.svg";

import SignInForm from "./SignInForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ForgotPassword from "./ForgotPassword";
import ResetSuccessful from "../../../Common/ResetSuccessful";

import { resetAuthenticationState } from "../../../Store/Slice/usersSlice";
import { changeType } from "../../../Store/Slice/typeSlice";

const SignIn = () => {
  const [isForgotModal, setIsForgotModalOpen] = useState(false);
  const [isResetSuccessfulModal, setIsResetSuccessfulModal] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract the `type` (determines the screen to show) and `isAuthenticated` from the Redux store
  const type = useSelector((state) => state.type.type);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  // Extract user data from Redux store based on userEmail
  const user_id = localStorage.getItem("uidb64");
  console.log("🚀 ~ SignIn ~ uidb64:", user_id);
  const token = localStorage.getItem("token");
  console.log("🚀 ~ SignIn ~ token:", token);

  // Redirect the user to the dashboard if they are authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Reset the authentication state when the `type` is not `resetPassword`
  useEffect(() => {
    if (type !== "resetPassword") {
      navigate("/sign-in");
      dispatch(resetAuthenticationState());
    } else if (user_id && token) {
      // Navigate to the reset password page if both uidb64 and token exist
      navigate(`/reset-password/?uidb64=${user_id}&token=${token}`);
      toast.info("Reset your password to regain access.");
    }
  }, [type, dispatch, navigate, user_id, token]);

  // Close all modals
  const handleCloseModal = () => {
    setIsForgotModalOpen(false);
    setIsResetSuccessfulModal(false);
  };

  return (
    <div className="overflow-hidden h-screen bg-cover bg-center bg-[url('./public/authBackground.svg')]">
      {/* Logo Section */}
      <div>
        <img className="p-5" src={logo} alt="Skill Sync logo" />
      </div>

      {/* Main Content Section */}
      <div className="min-h-screen relative">
        <div className="absolute top-36 left-8 sm:left-16 md:top-24 md:left-36 lg:top-36 lg:left-48 w-full max-w-sm">
          {/* Page Title */}
          <h2 className="text-2xl font-semibold mb-2 text-green-400">
            {type !== "resetPassword" ? "Sign In" : "Reset Password"}
          </h2>
          {/* Page Subtitle */}
          <p className="mb-6 font-light text-white">
            {type !== "resetPassword"
              ? "Admin Login: Access Your Dashboard"
              : "Reset your password to regain access."}
          </p>

          {/* Conditional Rendering of Forms */}
          {type !== "resetPassword" ? (
            <SignInForm setIsForgotModalOpen={setIsForgotModalOpen} />
          ) : (
            <ResetPasswordForm
              setIsResetSuccessfulModal={setIsResetSuccessfulModal}
            />
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModal && <ForgotPassword onClose={handleCloseModal} />}

      {/* Reset Successful Modal */}
      {isResetSuccessfulModal && <ResetSuccessful onClose={handleCloseModal} />}
    </div>
  );
};

export default SignIn;
