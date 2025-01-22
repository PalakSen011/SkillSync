import React, { useState } from "react";
import {info,add_new,add_green,darkdropdown,darkdropup,copy,trash} from "../../../Assets/index"

const AddTest = () => {
  // State to track if the dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open/close state
  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="m-5 w-full">
        <div className="gap-1 flex">
          <img src={info} alt="" className="h-5 " />
          <p className="text-sm text-neutral-500 ">
            Create a dynamic test packed with at least 25 engaging questions!
          </p>
        </div>
        <div className="w-full border mt-6 p-4 border-neutral-300">
          <div className="flex gap-3">
            <div className="flex w-2/3 flex-col">
              <label
                htmlFor="question"
                className="text-sm text-neutral-500 font-medium mb-1"
              >
                Question
              </label>
              <input
                type="text"
                id="question"
                className="border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex w-1/3 flex-col relative">
              <label
                htmlFor="question"
                className="text-sm text-neutral-500 font-medium mb-1"
              >
                Type
              </label>
              <select
                id="type"
                className="appearance-none border border-gray-300 px-3 py-2 text-sm pl-8 pr-3"
                onClick={handleDropdownClick} // Toggle on click
              >
                <option value=""></option>
                <option value="Multiple">Multiple</option>
                <option value="SingleChoice">Single Choice</option>
              </select>
              {/* Dropdown Icon with conditional rendering */}
              <img
                src={isOpen ? darkdropup : darkdropdown} // Switch icon based on state
                alt="dropdown"
                className="absolute top-2/3 right-3 transform -translate-y-1/2 transition-transform h-8"
              />
            </div>
          </div>
          {/* Radio Button Option */}
          <div className="mt-4 ml-1 flex items-center gap-2">
            <input
              type="radio"
              id="radioOption1"
              name="option"
              className="w-4 h-4"
            />
            <label htmlFor="radioOption1" className="text-sm text-neutral-500">
              Option 1 (Radio)
            </label>
          </div>
          {/* Checkbox Option */}
          <div className="mt-4 ml-1 flex items-center gap-2">
            <input type="checkbox" id="checkboxOption" className="w-4 h-4" />
            <label
              htmlFor="checkboxOption"
              className="text-sm text-neutral-500"
            >
              Option 1(Checkbox)
            </label>
          </div>
          {/* Buttons below the options */}
          <div className="mt-4 flex gap-1  ">
            <img src={add_new} alt="add new icon" className=" h-6" />
            <button className=" text-sm text-neutral-500">Add Option</button>
          </div>
          <hr className="m-6 h-px border bg-neutral-500" />
          {/* copy and delete buttons  */}
          <div className="mt-4 flex gap-4 justify-end">
            <img src={copy} alt="copy icon" className="h-8" />
            <img src={trash} alt="copy icon" className="h-6" />
          </div>
        </div>
        <div className="mt-4 flex gap-1  ">
          <img src={add_green} alt="add new icon" className=" h-6" />
          <button className=" text-sm text-green-500">Add Questions</button>
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn-secondary flex items-end">Save</button>
        </div>
      </div>
    </>
  );
};

export default AddTest;
