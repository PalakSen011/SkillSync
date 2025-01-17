import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../redux/usersSlice"; 
import logo from "../../../assets/logo.svg";
import show from "../../../assets/show.svg";
import hide from "../../../assets/hide.svg";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Users = useSelector((state) => state.users.Users);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() === "") {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(validateConfirmPassword(password, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required.");
      hasError = true;
    }

    if (!hasError && !nameError && !emailError && !passwordError && !confirmPasswordError) {
      // Dispatch addUser action to store user data
      dispatch(
        addUser({
          name,
          email,
          password,
        })
      );
      navigate("/");
    }
  };

  return (
    <div className="overflow-hidden h-screen bg-cover bg-center bg-[url('./assets/authBackground.svg')]">
      <div>
        <img className="p-5" src={logo} alt="skill sync logo" />
      </div>
      <div className="min-h-screen relative">
        <div className="absolute top-36 left-8 sm:left-16 md:top-24 md:left-36 lg:top-36 lg:left-48 w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-2 text-green-400">Sign Up</h2>
          <p className="mb-6 font-light text-white">Create an account to access courses.</p>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-2"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute top-3 right-2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? show : hide}
                    alt={showConfirmPassword ? "Hide password" : "Show password"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 border text-white border-green-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
