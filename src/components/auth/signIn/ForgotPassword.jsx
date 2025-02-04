import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeType } from "../../../Store/Slice/typeSlice";
import { setUserEmail } from "../../../Store/Slice/usersSlice";
import { validateEmail } from "../../../utils/validation";
import {
  sent_mail,
  forgotPassword as forgotPasswordImg,
} from "../../../Assets/index";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../Api/authApi"; // Import from authApi

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track API call status

  const type = useSelector((state) => state.type.type);
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handleSendClick = async () => {
    if (!email) {
      setEmailError("Email cannot be empty.");
      return;
    }
    if (emailError) return;

    setIsSubmitting(true); // Indicate the API request is in progress

    try {
      const response = await forgotPassword(email);
      toast.success(response.data.message);
      dispatch(setUserEmail(email));
      dispatch(changeType("sentEmail"));
    } catch (error) {
      toast.error(error?.response?.data?.email[0] || "Something went wrong");
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleResetClick = () => {
    dispatch(changeType("resetPassword"));
    onClose();
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
          className={type === "sentEmail" ? "w-1/3" : "w-80"}
          src={type === "sentEmail" ? sent_mail : forgotPasswordImg}
          alt="Password Reset"
        />

        {type === "sentEmail" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg p-3 text-center">
              Please check your registered email to reset your password.
            </h2>
            <p className="text-gray-500 text-xl pb-4">(C*******@gmail.com)</p>
            <button
              onClick={handleResetClick}
              className="bg-green-600 text-white px-8 py-2"
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 w-full">
              <h2 className="text-lg pb-3 text-center">
                Enter your email to get a reset link!
              </h2>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting} // Disable input while submitting
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleSendClick}
              className="bg-green-600 text-white px-8 py-2 flex items-center justify-center"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
