import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { addUser } from "../../../Store/Slice/usersSlice";

import { logo, show, hide } from "../../../Assets/index";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password", "");

  const onSubmit = (data) => {
    dispatch(
      addUser({ name: data.name, email: data.email, password: data.password })
    );
    navigate("/sign-in");
    toast.success("Account created successfully. Please sign in.");
  };

  return (
    <div className="overflow-hidden h-screen bg-cover bg-center bg-[url('./assets/authBackground.svg')]">
      <div>
        <img className="p-5" src={logo} alt="skill sync logo" />
      </div>
      <div className="min-h-screen relative">
        <div className="absolute top-36 left-8 sm:left-16 md:top-24 md:left-36 lg:top-36 lg:left-48 w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-2 text-green-400">
            Sign Up
          </h2>
          <p className="mb-6 font-light text-white">
            Create an account to access courses.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2"
                placeholder="Name"
                {...register("name", { required: "Name is required." })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required.",
                  validate: (value) => validateEmail(value) || true,
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required.",
                    validate: (value) => validatePassword(value) || true,
                  })}
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-2"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required.",
                    validate: (value) =>
                      validateConfirmPassword(password, value) || true,
                  })}
                />
                <button
                  type="button"
                  className="absolute top-3 right-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? show : hide}
                    alt={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
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
