import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import { addUser } from "../../../Store/Slice/usersSlice";
import { logo, show, hide } from "../../../Assets/index";
import { signUpUser } from "../../../Api/authApi";
import InputField from "../../../Common/InputField"; // Import InputField component

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track API submission status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password", "");

  const validatePhoneNumber = (value) => {
    return (
      /^[789]\d{9}$/.test(value) ||
      "Phone number must start with 7, 8, or 9 and be 10 digits long."
    );
  };

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
            <InputField
              label="First Name"
              required={true}
              placeholder="First Name"
              id="first_name"
              value=""
              onChange={(e) => register("first_name").onChange(e)}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name.message}</p>
            )}

            {/* Last Name */}
            <InputField
              label="Last Name"
              required={true}
              placeholder="Last Name"
              id="last_name"
              value=""
              onChange={(e) => register("last_name").onChange(e)}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}

            {/* Email */}
            <InputField
              label="Email"
              required={true}
              placeholder="Email"
              id="email"
              value=""
              onChange={(e) => register("email").onChange(e)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Phone Number */}
            <InputField
              label="Phone Number"
              required={true}
              placeholder="Phone Number"
              id="phone_number"
              value=""
              onChange={(e) => register("phone_number").onChange(e)}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
            )}

            {/* Gender Selection */}
            <div className="mb-4">
              <select
                className="w-full px-4 py-2"
                {...register("gender", { required: "Gender is required." })}
                disabled={isSubmitting}
              >
                <option value="">Select Gender</option>
                <option value="CHRELgT">Male</option>
                <option value="CHEfbqz">Female</option>
                <option value="CHN0hVk">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <select
                className="w-full px-4 py-2"
                {...register("role", { required: "Role is required." })}
                disabled={isSubmitting}
              >
                <option value="">Select Role</option>
                <option value="CHA6xgL">HR</option>
                <option value="CHWIISR">Developer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Password Field (Optional) */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2"
                  placeholder="Password (Optional)"
                  {...register("password")}
                  disabled={isSubmitting}
                />
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
            </div>

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
