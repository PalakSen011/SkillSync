import { useState } from "react";
import TogglePasswordButton from "./TogglePasswordButton";

export const PasswordField = ({
  register,
  name,
  errors,
  disabled,
  validation,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      <input
        type={showPassword ? "text" : "password"}
        className="w-full px-4 py-2 border text-sm text-neutral-500 "
        placeholder={
          name === "confirm_password" ? "Confirm Password" : "Password"
        }
        {...register(name, validation)}
        disabled={disabled}
      />
      {/* Toggle Password Visibility */}
      <TogglePasswordButton
        showPassword={showPassword}
        onClick={() => setShowPassword(!showPassword)}
        isSubmitting={disabled}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
      
    </div>
  );
};

export default PasswordField;
