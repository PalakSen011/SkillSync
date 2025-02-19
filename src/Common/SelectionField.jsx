import React from "react";

const SelectionField = ({ type, options, name }) => {
  return (
    <div className="p-3">
      <div className="mb-2 font-medium">{name}</div>
      <div className="flex gap-8">
        {options.map(({ id, label }) => (
          <label
            key={id}
            htmlFor={id}
            className="flex items-center gap-2 text-neutral-500 font-medium m-1"
          >
            <input
              type={type}
              name={name}
              id={id}
              className="w-4 h-4 text-green-600"
              
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectionField;
