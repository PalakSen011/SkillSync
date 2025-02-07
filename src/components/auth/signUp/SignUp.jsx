import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { logo, show, hide } from "../../../Assets/index";
import { signUpUser } from "../../../Api/authApi";

import { validatePhoneNumber,validatePassword } from "../../../utils/validation";
import { PasswordField } from "../../../Common/PasswordField";
import SignUpInputField from "../../../Common/SignUpInputField";
import { genderOptions, roleOptions } from "../../../Constants/Options";
import DropdownField from "../../../Common/DropdownField";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // const password = watch("password", "");

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await signUpUser(data);
      toast.success(response.data.message);
      navigate("/sign-in");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url('./assets/authBackground.svg')]">
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
            {/* First Name */}
            <SignUpInputField
              type="text"
              placeholder="First Name"
              register={register}
              name="first_name"
              errors={errors}
              disabled={isSubmitting}
              validation={{ required: "First name is required." }}
            />
            <SignUpInputField
              type="text"
              placeholder="Last Name"
              register={register}
              name="last_name"
              errors={errors}
              disabled={isSubmitting}
              validation={{ required: "Last name is required." }}
            />
            <SignUpInputField
              type="email"
              placeholder="Email"
              register={register}
              name="email"
              errors={errors}
              disabled={isSubmitting}
              validation={{ required: "Email is required." }}
            />
            <SignUpInputField
              type="text"
              placeholder="Phone Number"
              register={register}
              name="phone_number"
              errors={errors}
              disabled={isSubmitting}
              validation={{
                required: "Phone number is required.",
                validate: validatePhoneNumber,
              }}
            />
            <div className="flex justify-between gap-4 mb-4 ">
              {/* Gender Selection */}
              <DropdownField
                id="gender"
                required
                error={errors.gender}
                options={genderOptions}
                {...register("gender", { required: "Gender is required." })}
                disabled={isSubmitting}
                className=" border-red-500 w-1/2"
              />
              {/* Role Selection */}
              <DropdownField
                id="role"
                required
                error={errors.role}
                options={roleOptions}
                {...register("role", { required: "Role is required." })}
                disabled={isSubmitting}
                className="w-1/4"
              />
            </div>

            {/* Password Field (Optional) */}
            <PasswordField
              register={register}
              name="password"
              errors={errors}
              disabled={isSubmitting}
              validation={{
                required: "Password is required.",
                validate: validatePassword,
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 border text-white border-green-600 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
