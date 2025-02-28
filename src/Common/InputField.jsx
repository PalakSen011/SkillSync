import React from "react";

const InputField = ({
  id,
  label,
  name,
  required,
  value,
  type,
  placeholder,
  errors,
  className,
  onChange,
  register,
}) => {
  return (
    <div className={`${className || "flex flex-col"}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-neutral-500 font-medium mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        className={className || "appearance-none border px-3 py-2 text-sm"}
        {...(register ? register(name) : {})} // Spread only if register exists
        onChange={onChange}
      />

      {errors?.[id] && (
        <p className="text-red-500 text-sm">{errors?.[id]?.message}</p>
      )}
      <br />
    </div>
  );
};

export default InputField;
