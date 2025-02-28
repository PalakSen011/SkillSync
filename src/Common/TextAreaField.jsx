import React from "react";

const TextAreaField = ({
  id,
  label,
  required = false,
  errors,
  value,
  onChange,
  className = "",
  placeholder = "",
  disabled = false,
  rows = 5,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-500 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} resize-none`}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      ></textarea>
      {errors && (
        <p className="text-red-500 text-xs mt-1">
          {typeof errors === "string" ? errors : errors.message}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
