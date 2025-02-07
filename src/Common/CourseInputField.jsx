import React from "react";

const CourseInputField = ({
  id,
  label,
  required,
  type = "text",
  errors,
  className,
  ...rest
}) => {
  return (
    <div className={`${className || "flex flex-col"}`}>
      <label htmlFor={id} className="text-sm text-neutral-500 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required
        className={`appearance-none border px-3 py-2 text-sm `}
        {...rest}
      />
      {errors && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  );
};

export default CourseInputField;
