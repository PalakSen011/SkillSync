import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetAuthenticationState } from "../../../Store/Slice/usersSlice";
import { logo, authBackground } from "../../../Assets/index";
import SignInForm from "./SignInForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ForgotPassword from "./ForgotPassword";
import ResetSuccessful from "../../../Common/ResetSuccessful";

const SignIn = () => {
  const [isForgotModal, setIsForgotModalOpen] = useState(false);
  const [isResetSuccessfulModal, setIsResetSuccessfulModal] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const type = useSelector((state) => state.type.type);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const user_id = localStorage.getItem("uidb64");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (type !== "resetPassword") {
      navigate("/sign-in");
      dispatch(resetAuthenticationState());
    } else if (user_id && token) {
      navigate(`/reset-password/?uidb64=${user_id}&token=${token}`);
      toast.info("Reset your password to regain access.");
    }
  }, [type, dispatch, navigate, user_id, token]);

  const handleCloseModal = () => {
    setIsForgotModalOpen(false);
    setIsResetSuccessfulModal(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src={authBackground}
        alt="Background"
        className="hidden"
        onLoad={() => setIsBgLoaded(true)}
      />

      {/* Loader or Shimmer Effect */}
      {!isBgLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800">
          <div className="w-16 h-16 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`h-screen bg-cover bg-center transition-opacity duration-500 ${
          isBgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${authBackground})` }}
      >
        {/* Logo */}
        <div>
          <img className="p-5" src={logo} alt="Skill Sync logo" />
        </div>

        {/* Main Content Section */}
        <div className="min-h-screen relative">
          <div className="absolute top-36 left-8 sm:left-16 md:top-24 md:left-36 lg:top-36 lg:left-48 w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-400">
              {type !== "resetPassword" ? "Sign In" : "Reset Password"}
            </h2>
            <p className="mb-6 font-light text-white">
              {type !== "resetPassword"
                ? "Admin Login: Access Your Dashboard"
                : "Reset your password to regain access."}
            </p>

            {type !== "resetPassword" ? (
              <SignInForm setIsForgotModalOpen={setIsForgotModalOpen} />
            ) : (
              <ResetPasswordForm
                setIsResetSuccessfulModal={setIsResetSuccessfulModal}
              />
            )}
          </div>
        </div>

        {isForgotModal && <ForgotPassword onClose={handleCloseModal} />}
        {isResetSuccessfulModal && (
          <ResetSuccessful onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default SignIn;
