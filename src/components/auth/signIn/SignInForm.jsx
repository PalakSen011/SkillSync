import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../Store/Slice/usersSlice";
import { validateEmail, validatePassword } from "../../../utils/validation";
import show from "../../../assets/show.svg";
import hide from "../../../assets/hide.svg";

const SignIn = ({ setIsForgotModalOpen }) => {
  // State variables for managing form inputs and validation errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting authentication state from Redux
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  // Handle email input change and validate email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  // Handle password input change and validate password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    if (!isAuthenticated) {
      if (email === "") {
        setEmailError("Email cannot be empty.");
      }
      if (password === "") {
        setPasswordError("Password cannot be empty.");
      } else {
        setPasswordError("Invalid credentials.");
      }
    }
  };
  return (
    <>
      {/* Email Input Field */}
      <div className="mb-4">
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      {/* Password Input Field */}
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
          {/* Toggle Password Visibility */}
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
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>
      {/* Forgot Password Button */}
      <div className="mb-4 text-right">
        <button
          className="text-sm text-white hover:underline"
          onClick={() => setIsForgotModalOpen(true)}
        >
          Forgot password?
        </button>
      </div>
      {/* Sign In and Sign Up Buttons */}
      <div className="flex justify-between">
        <Link
          to="/dashboard"
          className="p-8 py-2 border text-white border-green-600"
          onClick={handleSubmit}
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="p-8 py-2 border text-white border-green-600"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};
export default SignIn;
