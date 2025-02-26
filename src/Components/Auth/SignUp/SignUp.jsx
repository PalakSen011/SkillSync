import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { logo } from "../../../Assets/";
import { signUpUser } from "../../../Api/authApi";
import { PATH_SIGNIN } from "../../../Constants/RouteConstants";
import { signUpFormFields } from "../../../Constants/InputFields";
import { MESSAGE_CONSTANTS } from "../../../Constants/MessageConstants";

import SubmitButton from "./SubmitButton";
import FieldTypeMapper from "../../../Common/FieldTypeMapper";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await signUpUser(data);
      toast.success(
        response?.data?.message || MESSAGE_CONSTANTS.SUCCESS_SIGNUP
      );
      navigate(PATH_SIGNIN);
    } catch (error) {
      toast.error(error?.message || MESSAGE_CONSTANTS.ERROR_DEFAULT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url('./assets/authBackground.svg')]">
      <div>
        <img className="p-5" src={logo} alt="Skill Sync Logo" />
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
            <FieldTypeMapper
              fields={signUpFormFields}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />
            <SubmitButton
              isSubmitting={isSubmitting}
              className="w-full py-2 border text-white border-green-600 flex items-center justify-center"
              message={
                isSubmitting
                  ? MESSAGE_CONSTANTS.signingIn
                  : MESSAGE_CONSTANTS.signIn
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
