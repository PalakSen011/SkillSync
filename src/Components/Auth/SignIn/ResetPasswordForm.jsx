import React, { useState } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { resetPassword } from "../../../Api/authApi";
import {
  validatePassword,
  validateConfirmPassword,
<<<<<<< HEAD:src/components/auth/signIn/ResetPasswordForm.jsx
} from "../../../utils/validation";

import SubmitButton from "../SignUp/SubmitButton";
=======
} from "../../../Utils/validation";
>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22:src/Components/Auth/SignIn/ResetPasswordForm.jsx
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";
import PasswordField from "../../../Common/PasswordField";

const ResetPassword = ({ setIsResetSuccessfulModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uidb64 = useSelector((state) => state.users?.user_id);
  const token = useSelector((state) => state.users?.token);

  if (!uidb64 || !token) {
    toast.error(MESSAGE_CONSTANTS.INVALID_CREDENTIALS);
    return;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const error = validatePassword(value);
    if (error) {
      setError("password", { type: "manual", message: error });
    } else {
      clearErrors("password");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    const error = validateConfirmPassword(password, value);
    if (error) {
      setError("confirmPassword", { type: "manual", message: error });
    } else {
      clearErrors("confirmPassword");
    }
  };

  const onSubmit = async (data) => {
    if (!uidb64 || !token) {
      toast.error(MESSAGE_CONSTANTS.INVALID_CREDENTIALS);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await resetPassword(
        {
          uidb64,
          new_password: data.password,
          confirm_password: data.confirmPassword,
        },
        token
      );
      toast.success(
        response?.data?.message || MESSAGE_CONSTANTS.PASSWORD_RESET_SUCCESS
      );
      setIsResetSuccessfulModal(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.error || MESSAGE_CONSTANTS.PASSWORD_RESET_ERROR
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Password Input */}
      <PasswordField
        register={register}
        name="password"
        errors={errors}
        validation={{
          required: MESSAGE_CONSTANTS.PASSWORD_EMPTY,
          validate: (value) => validatePassword(value) || true,
          onChange: handlePasswordChange,
        }}
        disabled={isSubmitting}
      />

      {/* Confirm Password Input */}
      <PasswordField
        register={register}
        name="confirmPassword"
        errors={errors}
        validation={{
          required: MESSAGE_CONSTANTS.CONFIRM_PASSWORD_EMPTY,
          validate: (value) => validateConfirmPassword(password, value) || true,
          onChange: handleConfirmPasswordChange,
        }}
        disabled={isSubmitting}
      />

      {/* Submit Button */}
      <SubmitButton
        isSubmitting={isSubmitting}
        className="p-8 py-2 border text-white border-green-600"
        message={
          isSubmitting
            ? MESSAGE_CONSTANTS.RESETTING_BUTTON
            : MESSAGE_CONSTANTS.RESET_BUTTON
        }
      />
    </form>
  );
};

export default ResetPassword;
