import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logo, authBackground } from "../../../Assets/index";
import { resetAuthenticationState } from "../../../Store/Slice/usersSlice";
import ResetSuccessful from "../../../Common/ResetSuccessful";

import {
  PATH_SIGNIN,
  PATH_DASHBOARD,
  PATH_RESET_PASSWORD,
} from "../../../Constants/RouteConstants";
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";

import { SignInForm, ResetPasswordForm, ForgotPassword } from "../index";

const SignIn = () => {
  const [isForgotModal, setIsForgotModalOpen] = useState(false);
  const [isResetSuccessfulModal, setIsResetSuccessfulModal] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const type = useSelector((state) => state.type?.type);
  const user_id = useSelector((state)=>state.users?.user_id)
  const token = useSelector((state)=>state.users?.token);
  const isAuthenticated = useSelector((state) => state.users?.isAuthenticated);
  
  const isSignInMode = type !== "resetPassword";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSignInMode) {
      navigate(PATH_SIGNIN);
      dispatch(resetAuthenticationState());
    } else if (user_id && token) {
      navigate(`${PATH_RESET_PASSWORD}/?uidb64=${user_id}&token=${token}`);
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
        alt={MESSAGE_CONSTANTS.BACKGROUND_ALT_TEXT}
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
        <div>
          <img
            className="p-5"
            src={logo}
            alt={MESSAGE_CONSTANTS.LOGO_ALT_TEXT}
          />
        </div>

        {/* Main Content Section */}
        <div className="min-h-screen relative">
          <div className="absolute top-36 left-8 sm:left-16 md:top-24 md:left-36 lg:top-36 lg:left-48 w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-2 text-green-400">
              {isSignInMode
                ? MESSAGE_CONSTANTS.SIGN_IN_TITLE
                : MESSAGE_CONSTANTS.RESET_PASSWORD_TITLE}
            </h2>
            <p className="mb-6 font-light text-white">
              {isSignInMode
                ? MESSAGE_CONSTANTS.SIGN_IN_DESCRIPTION
                : MESSAGE_CONSTANTS.RESET_PASSWORD_DESCRIPTION}
            </p>

            {isSignInMode ? (
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
