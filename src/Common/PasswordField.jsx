import { useState } from "react";
import { show, hide } from "../Assets/index";

export const PasswordField = ({ register, name, errors, disabled, validation }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full px-4 py-2 border rounded"
        placeholder={name === "confirm_password" ? "Confirm Password" : "Password"}
        {...register(name, validation)}
        disabled={disabled}
      />
      <button
        type="button"
        className="absolute top-3 right-2"
        onClick={() => setShowPassword(!showPassword)}
        disabled={disabled}
      >
        <img
          src={showPassword ? show : hide}
          alt={showPassword ? "Hide password" : "Show password"}
          className="w-5 h-5"
        />
      </button>
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
};

export default PasswordField;
