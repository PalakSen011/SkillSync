import React, { useState } from "react";
import { filterFields } from "../Constants/InputFields";
import FieldTypeMapper from "./FieldTypeMapper";

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

  // Reset all filters
  const handleClearAll = () => {
    setFilters({
      mandatory: "",
      category: [],
      status: [],
      assigneeRange: [0, 100],
      courseDuration: [0, 100],
    });
  };

  // Apply filters
  const handleApply = () => {
    console.log("Applied Filters:", filters);
    // Add your filter application logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white pt-2 shadow-lg max-w-xl w-1/4">
        <div className="text-sm">
          <FieldTypeMapper
            fields={filterFields}
            filters={filters}
            handleMandatoryChange={handleMandatoryChange}
            handleCheckboxChange={handleCheckboxChange}
            handleRangeChange={handleRangeChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6 p-3">
          <button className="btn-primary" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="btn-secondary" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
