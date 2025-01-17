import React, { useEffect, useState } from "react";
import forgotPassword from "../../../assets/forgotPassword.svg";
import resetPasswordImage from "../../../assets/sent-mail.gif";
import { useDispatch, useSelector } from "react-redux";
import { changeType } from "../../../redux/typeSlice";
import { resetUserEmail, setUserEmail } from "../../../redux/usersSlice";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Redux selectors and dispatcher
  const type = useSelector((state) => state.type.type);
  const userEmail = useSelector((state) => state.users.userEmail);
  const userEmailError = useSelector((state) => state.users.userEmailError);
  const dispatch = useDispatch();

  // Handle email input change and validate email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  // Handle "Send" button click
  const handleSendClick = () => {
    if (email.length > 0) {
      dispatch(setUserEmail(email));
    } else {
      setEmailError("Email cannot be empty.");
    }
  };

  // Effect to handle changes in email state or errors
  useEffect(() => {
    if (userEmailError) {
      setEmailError("Email not found. Please enter a valid registered email.");
    } else if (userEmail) {
      dispatch(changeType("sentEmail"));
    }
  }, [userEmailError, userEmail]);

  // Handle "Reset" button click
  const handleResetClick = () => {
    dispatch(changeType("resetPassword"));
    onClose();
  };
  
  // Handle close button click
  const handleCloseButton = () => {
    dispatch(changeType(""));
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-10 w-1/3 flex flex-col items-center relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-5 text-xl font-semibold"
          onClick={handleCloseButton}
        >
          X
        </button>
        {/* Dynamic Image based on modal type */}
        {type === "sentEmail" ? (
          <div className="flex items-center justify-center">
            <img
              className="w-1/3"
              src={resetPasswordImage}
              alt="Reset Password Image"
            />
          </div>
        ) : (
          <div>
            <img
              className="w-80"
              src={forgotPassword}
              alt="Forgot Password Image"
            />
          </div>
        )}
        {/* Dynamic Content based on modal type */}
        {type === "sentEmail" ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg p-3 text-center">
              Please click on the link sent to your registered email to reset
              your password.
            </h2>
            <p className="text-gray-500 w-full text-center text-xl pb-4">
              {"(C*******@gmail.com)"} {/* Example email */}
            </p>
            {/* Reset Button */}
            <button
              onClick={handleResetClick}
              className="bg-green-600 text-white px-8 py-2"
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            {/* Email Input Field */}
            <div className="mb-4">
              <h2 className="text-lg pb-3">
                Enter your email to get your reset link!
              </h2>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-400"
                placeholder="carol.davic21@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
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