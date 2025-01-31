import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { setisAuthenticated, setUser } from "../../../Store/Slice/usersSlice";
import { validateEmail, validatePassword } from "../../../utils/validation";
import { show, hide } from "../../../Assets/index";
import { PATH_SIGNUP } from "../../../Constants/RouteConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { loginUser } from "../../../Api/authApi";
const SignInForm = ({ setIsForgotModalOpen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track API call status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Indicate the API request is in progress

    try {
      const response = await loginUser(data); // Use the loginUser action for API call
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("uidb64", "VVJNbkZXcw");
      dispatch(setisAuthenticated());
      navigate("/dashboard");
      toast.success("Signed In Successfully");
    } catch (error) {
      toast.error("Invalid Email or Password");
    } finally {
      setIsSubmitting(false); // Reset state after API call completes
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
              disabled={isSubmitting} // Disable input while submitting
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
                disabled={isSubmitting} // Disable input while submitting
              />
            )}
          />
          {/* Toggle Password Visibility */}
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting} // Disable button while submitting
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
          disabled={isSubmitting} // Disable while submitting
        >
          Forgot password?
        </button>
      </div>

      {/* Sign In and Sign Up Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="p-8 py-2 border text-white border-green-600 flex items-center justify-center"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
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
