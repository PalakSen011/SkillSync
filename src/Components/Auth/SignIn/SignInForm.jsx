import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../Api/authApi";
import { setAuthData } from "../../../Store/Slice/usersSlice";
import { validateEmail, } from "../../../utils/validation";

<<<<<<< HEAD:src/components/auth/signIn/SignInForm.jsx
import SignInFields from "./SingInField";
import SubmitButton from "../SignUp/SubmitButton";
import { signInFormFields } from "../../../Constants/InputFields";
=======
import { show, hide } from "../../../Assets/index";

import { setisAuthenticated } from "../../../Store/Slice/usersSlice";

import { validateEmail, validatePassword } from "../../../Utils/validation";

>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22:src/Components/Auth/SignIn/SignInForm.jsx
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";
import { PATH_SIGNUP, PATH_DASHBOARD } from "../../../Constants/RouteConstants";

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

<<<<<<< HEAD:src/components/auth/signIn/SignInForm.jsx
  // Handle email validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const error = validateEmail(value);
      if (error) {
        setError("email", { type: "manual", message: error });
      } else {
        clearErrors("email");
      }
    }
  };

=======
>>>>>>> 053b7dea817024186a614e80046c90a4f61b7f22:src/Components/Auth/SignIn/SignInForm.jsx
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <SignInFields
          fields={signInFormFields}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleInputChange}
        />
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
