import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {password} from "../Assets/index";

import { changeType } from "../Store/Slice/typeSlice";

const ResetSuccessful = ({ onClose }) => {
  const [countdown, setCountdown] = useState(10);
  const [showSignIn, setShowSignIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countdown <= 0) {
      setShowSignIn(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSignIn = () => {
    onClose();
    dispatch(changeType("signIn"));
  };

  // Format the countdown to always show
  const formatCountdown = (time) => {
    return time < 10 ? `00:0${time}` : `00:${time}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-10 w-1/3 flex flex-col items-center relative">
        {/* Center the image */}
        <div className="flex items-center justify-center">
          <img
            className=" w-1/3"
            src={password}
            alt="Password Reset Successful"
          />
        </div>

        <div className="text-center mb-3">
          <h2 className="text-lg pb-3">Password reset successful!</h2>
          {showSignIn ? (
            <p>Click the button below to sign in.</p>
          ) : (
            <>
              <p>You will be redirected to the sign-in page in 10 seconds.</p>
              <p className="text-green-500 font-semibold text-xl">
                {" "}
                {formatCountdown(countdown)}
              </p>
            </>
          )}
        </div>

        {showSignIn && (
          <button
            onClick={handleSignIn}
            className="btn-secondary "
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetSuccessful;
