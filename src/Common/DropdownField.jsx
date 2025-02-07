import React from "react";

const DropdownField = React.forwardRef(
  ({ id, label, required, options, error, className, ...register }, ref) => {
    return (
      <div className={`${className || "flex flex-col w-1/4"}`}>
        <label
          htmlFor={id}
          className="text-sm text-neutral-500 font-medium mb-1"
        >
          {label && (
            <label
              htmlFor={id}
              className="text-sm text-neutral-500 font-medium mb-1"
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
          )}{" "}
        </label>
        <select
          id={id}
          ref={ref}
          className={`appearance-none border px-3 py-2 text-sm ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
          {...register}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

export default DropdownField;

0.3;
