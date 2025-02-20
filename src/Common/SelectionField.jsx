import React from "react";

const SelectionField = ({ type, options, name, onChange, selected }) => {
  const handleChange = (event) => {
    const { id, checked } = event.target;
    if (type === "radio") {
      onChange(id); // Update radio state
    } else {
      onChange(name, id, checked); // Update checkbox state
    }
  };

  return (
    <>
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
                checked={
                  type === "radio" ? selected === id : selected.includes(id)
                }
                onChange={handleChange}
                className="w-4 h-4 text-green-600"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="my-2 w-full">
        <hr className="border-t border-gray-300 w-full" />
      </div>
    </>
  );
};

export default SelectionField;
