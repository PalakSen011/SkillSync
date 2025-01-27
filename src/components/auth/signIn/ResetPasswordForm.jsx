import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../Store/Slice/usersSlice";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validation";
import { show, hide } from "../../../Assets/index";

const ResetPassword = ({ setIsResetSuccessfulModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.users.userEmail);
  const password = watch("password", "");

  // Function to handle onChange event
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

  const onSubmit = (data) => {
    // Dispatch action to reset the password
    dispatch(resetPassword({ userEmail, newPassword: data.password }));
    setIsResetSuccessfulModal(true);
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
        {/* Password validation error */}
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
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
                onChange={(e) => {
                  field.onChange(e);
                  if (validateConfirmPassword(password, e.target.value)) {
                    setError("confirmPassword", {
                      type: "manual",
                      message: validateConfirmPassword(
                        password,
                        e.target.value
                      ),
                    });
                  } else {
                    clearErrors("confirmPassword");
                  }
                }}
              />
            )}
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
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="p-8 py-2 border text-white border-green-600"
      >
        Reset
      </button>
    </form>
  );
};

export default ResetPassword;
