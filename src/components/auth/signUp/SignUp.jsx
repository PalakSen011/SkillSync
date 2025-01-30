import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import { addUser } from "../../../Store/Slice/usersSlice";

import { logo, show, hide } from "../../../Assets/index";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      const response = await axios.post(
        "https://skill-sync-be-dev-c4b597280ca7.herokuapp.com/api/admin-panel/signup/",
        data
        // { headers: { "Content-Type": "application/json" } }
      );
      console.log("🚀 ~ onSubmit ~ response:", response);

      toast.success(response.data.message);
      // dispatch(
      //   addUser({ name: data.name, email: data.email, password: data.password })
      // );
      navigate("/sign-in");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className=" bg-cover bg-center bg-[url('./assets/authBackground.svg')]">
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
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="First Name"
                {...register("first_name", {
                  required: "First name is required.",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="Last Name"
                {...register("last_name", {
                  required: "Last name is required.",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2"
                placeholder="Email"
                {...register("email", { required: "Email is required." })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="Phone Number"
                {...register("phone_number", {
                  required: "Phone number is required.",
                  validate: validatePhoneNumber,
                })}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Gender Selection */}
            <div className="mb-4">
              <select
                className="w-full px-4 py-2"
                {...register("gender", { required: "Gender is required." })}
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
              >
                <option value="">Select Role</option>
                <option value="CHA6xgL">HR</option>
                <option value="">Manager</option>
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
                />
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 border text-white border-green-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
