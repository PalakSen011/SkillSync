import React from "react";

const InputField = React.forwardRef(
  ({ id, label, required, type = "text", error, className, ...rest }, ref) => {
    return (
      <div className={`${className || "flex flex-col"}`}>
        <label
          htmlFor={id}
          className="text-sm text-neutral-500 font-medium mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          id={id}
          type={type}
          ref={ref}
          required
          className={`appearance-none border px-3 py-2 text-sm ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

export default InputField;
