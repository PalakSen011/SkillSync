import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  loginUser,
  setisAuthenticated,
  setUser,
} from "../../../Store/Slice/usersSlice";

import { validateEmail, validatePassword } from "../../../utils/validation";

import { show, hide } from "../../../Assets/index";
import { PATH_SIGNUP } from "../../../Constants/RouteConstants";
import axios from "axios";
import { toast } from "react-toastify";

const SignInForm = ({ setIsForgotModalOpen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const onSubmit = async (data) => {
    console.log("🚀 ~ data:", data);
    try {
      const response = await axios.post(
        "https://skill-sync-be-dev-c4b597280ca7.herokuapp.com/api/admin-panel/login/",
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("uidb64", "VVJNbkZXcw");
      dispatch(setisAuthenticated());
      navigate("/dashboard");
      toast.success("Signed In Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input Field */}
      <div className="mb-4">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email cannot be empty.",
            validate: (value) => validateEmail(value) || true,
          }}
          render={({ field }) => (
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2"
              placeholder="Email"
              {...field}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      {/* Password Input Field */}
      <div className="mb-4">
        <div className="relative">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password cannot be empty.",
              validate: (value) => validatePassword(value) || true,
            }}
            render={({ field }) => (
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2"
                placeholder="Password"
                {...field}
              />
            )}
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
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      {/* Forgot Password Button */}
      <div className="mb-4 text-right">
        <button
          type="button"
          className="text-sm text-white hover:underline"
          onClick={() => setIsForgotModalOpen(true)}
        >
          Forgot password?
        </button>
      </div>
      {/* Sign In and Sign Up Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="p-8 py-2 border text-white border-green-600"
        >
          Sign In
        </button>
        <Link
          to={PATH_SIGNUP}
          className="p-8 py-2 border text-white border-green-600"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
