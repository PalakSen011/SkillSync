import React, { useState } from "react";
import SelectionField from "./SelectionField";
import {
  categoryOptions,
  mandatoryOptions,
  statusOptions,
} from "../Constants/Options";
import RangeSlider from "./RangeSlider";

const FilterModal = () => {
  const [filters, setFilters] = useState({
    mandatory: "",
    category: [],
    status: [],
    assigneeRange: [0, 100],
    courseDuration: [0, 100],
  });

  // Handler for radio inputs (Mandatory)
  const handleMandatoryChange = (value) => {
    setFilters((prev) => ({ ...prev, mandatory: value }));
  };

  // Handler for checkbox inputs (Category, Status)
  const handleCheckboxChange = (name, value) => {
    setFilters((prev) => {
      const currentValues = prev[name];
      return {
        ...prev,
        [name]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value) // Remove if already selected
          : [...currentValues, value], // Add if not selected
      };
    });
  };

  // Handler for range sliders
  const handleRangeChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white pt-2 shadow-lg max-w-xl w-1/4">
        <div className="text-sm">
          {/* Mandatory section */}
          <SelectionField
            type="radio"
            name="mandatory"
            options={mandatoryOptions}
            onChange={handleMandatoryChange}
            selected={filters.mandatory}
          />

          {/* Category Section */}
          <SelectionField
            type="checkbox"
            name="category"
            options={categoryOptions}
            onChange={handleCheckboxChange}
            selected={filters.category}
          />
          {/* 
          <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div> */}

          {/* Status Section */}
          <SelectionField
            type="checkbox"
            name="status"
            options={statusOptions}
            onChange={handleCheckboxChange}
            selected={filters.status}
          />

          {/* <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div> */}

          {/* Range Sliders */}
          <div className="mt-3">
            <RangeSlider
              onChange={(value) => handleRangeChange("assigneeRange", value)}
              message="No of assignees"
              value={filters.assigneeRange}
            />
          </div>

          {/* <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div> */}

          <div className="mt-3">
            <RangeSlider
              onChange={(value) => handleRangeChange("courseDuration", value)}
              message="Course Duration (min)"
              value={filters.courseDuration}
            />
          </div>

          {/* <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6 p-3">
          <button
            className="btn-primary"
            onClick={() =>
              setFilters({
                mandatory: "",
                category: [],
                status: [],
                assigneeRange: [0, 100],
                courseDuration: [0, 100],
              })
            }
          >
            Clear All
          </button>
          <button
            className="btn-secondary"
            onClick={() => console.log("Applied Filters:", filters)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
