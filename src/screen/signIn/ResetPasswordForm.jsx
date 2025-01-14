import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/usersSlice";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import show from "../../assets/show.svg";
import hide from "../../assets/hide.svg";

const ResetPassword = ({ setIsResetSuccessfulModal }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.users.userEmail);

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(validateConfirmPassword(password, e.target.value));
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "") {
      setPasswordError("Password cannot be empty.");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Password cannot be empty.");
      return;
    }
    if (confirmPasswordError || passwordError) {
      return;
    }
    // Dispatch action to reset the password
    dispatch(resetPassword({ userEmail, newPassword: password }));
    setIsResetSuccessfulModal(true);
  };

  return (
    <>
      {/* Password Input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            id="password"
            className="w-full px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {/* Toggle show/hide password */}
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? show : hide}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        </div>
        {/* Password validation error */}
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <div className="relative">
          <input
            type={showRePassword ? "text" : "password"} 
            id="confirmPassword"
            className="w-full px-4 py-2"
            placeholder="Re-enter New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {/* Toggle show/hide confirmation password */}
          <button
            type="button"
            className="absolute top-3 right-2 text-gray-500"
            onClick={() => setShowRePassword(!showRePassword)}
          >
            <img
              src={showRePassword ? show : hide}
              alt={showRePassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        </div>
        {/* Confirm password validation error */}
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}
      </div>
      {/* Submit Button */}
      <button
        className="p-8 py-2 border text-white border-green-600"
        onClick={handleSubmit}
      >
        Reset
      </button>
    </>
  );
};
export default ResetPassword;
