import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../Api/authApi";
import { setAuthData } from "../../../Store/Slice/usersSlice";
import { validateEmail, validatePassword } from "../../../utils/validation";

import SubmitButton from "../SignUp/SubmitButton";
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";
import { PATH_SIGNUP, PATH_DASHBOARD } from "../../../Constants/RouteConstants";
import { InputField, PasswordField } from "../../../Common";

const SignInForm = ({ setIsForgotModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await loginUser(data);
      const user_id = response?.data?.user_id;
      const token = response?.data?.token;

      dispatch(setAuthData({ user_id, token }));
      navigate(PATH_DASHBOARD);
      toast.success(MESSAGE_CONSTANTS.signInSuccess);
    } catch (error) {
      toast.error(error?.message || MESSAGE_CONSTANTS.ERROR_DEFAULT);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const error = validateEmail(value);
    if (error) {
      setError("email", { type: "manual", message: error });
    } else {
      clearErrors("email");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input Field */}
      <div className="mb-4">
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          validation={{
            required: MESSAGE_CONSTANTS.emailRequired,
            validate: (value) => validateEmail(value) || true,
          }}
          errors={errors}
          disabled={isSubmitting}
          onChange={(e) => {
            handleEmailChange;
          }}
        />
      </div>

      {/* Password Input Field */}
      <div className="mb-4">
        <div className="relative">
          <PasswordField
            register={register}
            name="password"
            errors={errors}
            disabled={isSubmitting}
            validation={{
              required: MESSAGE_CONSTANTS.passwordRequired,
              validate: (value) => validatePassword(value) || true,
            }}
          />
        </div>
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
        <SubmitButton
          isSubmitting={isSubmitting}
          className="p-8 py-2 border text-white border-green-600 flex items-center justify-center"
          message={
            isSubmitting
              ? MESSAGE_CONSTANTS.signingIn
              : MESSAGE_CONSTANTS.signIn
          }
        />

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
