import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { changeType } from "../../../Store/Slice/typeSlice";
import { setUserEmail } from "../../../Store/Slice/usersSlice";
import { validateEmail } from "../../../utils/validation";
import { sent_mail, forgotPassword } from "../../../Assets/index";
import { toast } from "react-toastify";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const type = useSelector((state) => state.type.type);
  const userEmail = useSelector((state) => state.users.userEmail);
  const dispatch = useDispatch();

  // Handle email input change and validate email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  // Handle "Send" button click
  const handleSendClick = async () => {
    if (!email) {
      setEmailError("Email cannot be empty.");
      return;
    }
    if (emailError) return;

    try {
      const response = await axios.post(
        "https://skill-sync-be-dev-c4b597280ca7.herokuapp.com/api/admin-panel/forgot-password/",
        { email }
      );
      console.log("🚀 ~ handleSendClick ~ response", response);
      toast.success(response.data.message);
      dispatch(setUserEmail(email));
      dispatch(changeType("sentEmail"));
    } catch (error) {
      console.log("🚀 ~ handleSendClick ~ error", error);
      toast.error(error?.message || "Something went wrong");
      // setEmailError("Something went wrong. Please try again.");
    }
  };
  // Handle "Reset" button click
  const handleResetClick = () => {
    dispatch(changeType("resetPassword"));
    onClose();
  };
  // Handle successful email submission
  // useEffect(() => {
  //   if (userEmail) {
  //     dispatch(changeType("sentEmail"));
  //   }
  // }, [userEmail, dispatch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-10 w-1/3 flex flex-col items-center relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-5 text-xl font-semibold"
          onClick={onClose}
        >
          X
        </button>

        {/* Dynamic Image */}
        <img
          className={type === "sentEmail" ? "w-1/3" : "w-80"}
          src={type === "sentEmail" ? sent_mail : forgotPassword}
          alt="Password Reset"
        />

        {/* Content Based on Type */}
        {type === "sentEmail" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg p-3 text-center">
              Please check your registered email to reset your password.
            </h2>
            <p className="text-gray-500 text-xl pb-4">
              {"(C*******@gmail.com)"} {/* Example email */}
            </p>
            <button
              onClick={handleResetClick}
              className="bg-green-600 text-white px-8 py-2"
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            {/* Email Input */}
            <div className="mb-4 w-full">
              <h2 className="text-lg pb-3">
                Enter your email to get a reset link!
              </h2>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendClick}
              className="bg-green-600 text-white px-8 py-2"
            >
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
