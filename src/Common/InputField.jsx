import React from "react";

const InputField = ({
  label,
  required,
  type = "text",
  value,
  placeholder,
  onChange,
  id,
}) => (
  <div className="flex flex-col w-2/3 ">
    <label htmlFor={id} className="text-sm  text-neutral-500 font-medium mb-1">
      {label}
      {required &&  <span className="req"> *</span>}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="border border-gray-300 px-3 py-2 text-sm"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
