import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  sent_mail,
  forgotPassword as forgotPasswordImg,
} from "../../../Assets/index";

import { changeType } from "../../../Store/Slice/typeSlice";
import { setUserEmail } from "../../../Store/Slice/usersSlice";

  
import { forgotPassword } from "../../../Api/authApi";
import { validateEmail } from "../../../utils/validation";
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const type = useSelector((state) => state?.type?.type);
  const dispatch = useDispatch();

  const isSentEmailMode = type === "sentEmail";

  const handleEmailChange = (e) => {
    setEmail(e.target?.value);
    setEmailError(validateEmail(e.target?.value));
  };

  const handleSendClick = async () => {
    if (!email) {
      setEmailError(MESSAGE_CONSTANTS.EMAIL_EMPTY);
      return;
    }
    if (emailError) return;

    setIsSubmitting(true);

    try {
      const response = await forgotPassword(email);
      toast.success(response?.data?.message);
      dispatch(setUserEmail(email));
      dispatch(changeType("sentEmail"));
    } catch (error) {
      toast.error(
        error?.response?.data?.email?.[0] || MESSAGE_CONSTANTS.ERROR_DEFAULT
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetClick = () => {
    dispatch(changeType("resetPassword"));
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-10 w-1/3 flex flex-col items-center relative">
        <button
          className="absolute top-2 right-5 text-xl font-semibold"
          onClick={onClose}
        >
          X
        </button>

        <img
          className={isSentEmailMode ? "w-1/3" : "w-80"}
          src={isSentEmailMode ? sent_mail : forgotPasswordImg}
          alt="Password Reset"
        />
  
        {isSentEmailMode ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg p-3 text-center">
              {MESSAGE_CONSTANTS.EMAIL_CHECK}
            </h2>
            <p className="text-gray-500 text-xl pb-4">(C*******@gmail.com)</p>
            <button
              onClick={handleResetClick}
              className="bg-green-600 text-white px-8 py-2"
            >
              {MESSAGE_CONSTANTS.RESET_BUTTON}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 w-full">
              <h2 className="text-lg pb-3 text-center">
                {MESSAGE_CONSTANTS.ENTER_EMAIL}
              </h2>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-400"
                placeholder={MESSAGE_CONSTANTS.EMAIL_PLACEHOLDER}
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleSendClick}
              className="bg-green-600 text-white px-8 py-2 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                  {MESSAGE_CONSTANTS.SENDING_BUTTON}
                </>
              ) : (
                MESSAGE_CONSTANTS.SEND_BUTTON
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
