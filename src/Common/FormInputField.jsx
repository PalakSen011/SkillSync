import React from "react";
import { Controller } from "react-hook-form";
import TogglePasswordButton from "./TogglePasswordButton";

const FormInputField = ({
  name,
  control,
  rules,
  type,
  placeholder,
  disabled,
  showPassword,
  togglePassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <div className="relative">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                type={name === "password" && !showPassword ? "password" : type}
                id={name}
                className="w-full px-4 py-2"
                placeholder={placeholder}
                {...field}
                disabled={disabled}
              />
              {name === "password" && (
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={togglePassword}
                  disabled={disabled}
                >
                  <TogglePasswordButton
                    showPassword={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    isSubmitting={disabled}
                  />
                </button>
              )}
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default FormInputField;
