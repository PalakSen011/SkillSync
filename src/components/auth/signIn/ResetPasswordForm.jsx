import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { show, hide } from "../../../Assets/index";
import { resetPassword } from "../../../Api/authApi";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";

const ResetPassword = ({ setIsResetSuccessfulModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uidb64 = localStorage.getItem("uidb64");
  const token = localStorage.getItem("token");

  if (!uidb64 || !token) {
    toast.error("Invalid or missing credentials.");
    return;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const password = watch("password", "");

  // Function to handle onChange event of password field
  const handlePasswordChange = (field) => (e) => {
    const value = e.target.value;
    field.onChange(value);
    const error = validatePassword(value);
    if (error) {
      setError("password", {
        type: "manual",
        message: error,
      });
    } else {
      clearErrors("password");
    }
  };
  // Function to handle onChange event of confirm password field
  const handleConfirmPasswordChange = (field) => (e) => {
    field.onChange(e);
    if (validateConfirmPassword(password, e.target.value)) {
      setError("confirmPassword", {
        type: "manual",
        message: validateConfirmPassword(password, e.target.value),
      });
    } else {
      clearErrors("confirmPassword");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!uidb64 || !token) {
      toast.error("Invalid or missing credentials.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await resetPassword(
        {
          uidb64,
          new_password: data?.password,
          confirm_password: data?.confirmPassword,
        },
        token
      );
      toast.success(
        response?.data?.message || "Password has been reset successfully."
      );
      setIsResetSuccessfulModal(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "An error occurred while resetting the password."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Password Input */}
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
                onChange={handlePasswordChange(field)}
              />
            )}
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
        {errors.password && (
          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <div className="relative">
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm Password cannot be empty.",
              validate: (value) =>
                validateConfirmPassword(password, value) || true,
            }}
            render={({ field }) => (
              <input
                type={showRePassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-4 py-2"
                placeholder="Re-enter New Password"
                {...field}
                onChange={handleConfirmPasswordChange(field)}
              />
            )}
          />
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
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors?.confirmPassword?.message}
          </p>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="p-8 py-2 border text-white border-green-600"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            Resetting...
          </>
        ) : (
          "Reset"
        )}
      </button>
    </form>
  );
};

export default ResetPassword;
