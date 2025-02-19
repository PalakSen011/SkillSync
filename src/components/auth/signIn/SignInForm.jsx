import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../Api/authApi";

import { show, hide } from "../../../Assets/index";

import { setisAuthenticated } from "../../../Store/Slice/usersSlice";

import { validateEmail, validatePassword } from "../../../utils/validation";


import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";
import { PATH_SIGNUP, PATH_DASHBOARD } from "../../../Constants/RouteConstants";

const SignInForm = ({ setIsForgotModalOpen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("uidb64", "VVJNbkZXcw");
      dispatch(setisAuthenticated(true));
      navigate(PATH_DASHBOARD);
      toast.success(MESSAGE_CONSTANTS.signInSuccess);
    } catch (error) {
      toast.error(error?.message || MESSAGE_CONSTANTS.ERROR_DEFAULT);
    } finally {
      setIsSubmitting(false);
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
            required: MESSAGE_CONSTANTS.emailRequired,
            validate: (value) => validateEmail(value) || true,
          }}
          render={({ field }) => (
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2"
              placeholder="Email"
              {...field}
              disabled={isSubmitting} // Disable input while submitting
            />
          )}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm">{errors?.email?.message}</p>
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
              required: MESSAGE_CONSTANTS.passwordRequired,
              validate: (value) => validatePassword(value) || true,
            }}
            render={({ field }) => (
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2"
                placeholder="Password"
                {...field}
                disabled={isSubmitting}
              />
            )}
          />
          {/* Toggle Password Visibility */}
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting}
          >
            <img
              src={showPassword ? show : hide}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        </div>
        {errors?.password && (
          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        )}
      </div>

      {/* Forgot Password Button */}
      <div className="mb-4 text-right">
        <button
          type="button"
          className="text-sm text-white hover:underline"
          onClick={() => setIsForgotModalOpen(true)}
          disabled={isSubmitting}
        >
          {MESSAGE_CONSTANTS.forgotPassword}
        </button>
      </div>

      {/* Sign In and Sign Up Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="p-8 py-2 border text-white border-green-600 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
              {MESSAGE_CONSTANTS.signingIn}
            </>
          ) : (
            MESSAGE_CONSTANTS.signIn
          )}
        </button>

        <Link
          to={PATH_SIGNUP}
          className="p-8 py-2 border text-white border-green-600"
        >
          {MESSAGE_CONSTANTS.signUp}
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
