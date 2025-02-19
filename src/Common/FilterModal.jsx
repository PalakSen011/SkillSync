import React from "react";
import SelectionField from "./SelectionField";
import {
  categoryOptions,
  mandatoryOptions,
  statusOptions,
} from "../Constants/Options";
import RangeSlider from "./RangeSlider";

const FilterModal = () => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white pt-2  mr-6 ml-0  shadow-lg max-w-xl w-1/4">
        <div className="text-sm">
          {/* Mandatory section */}
          <SelectionField
            type="radio"
            name="Mandatory"
            options={mandatoryOptions}
          />

          {/* Full-width divider */}
          <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div>

          {/* Category Section */}
          <SelectionField
            type="checkbox"
            name="Category"
            options={categoryOptions}
          />

          {/* Full-width divider */}
          <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div>

          {/* Status Section */}
          <SelectionField
            type="checkbox"
            name="Status"
            options={statusOptions}
          />

          {/* Full-width divider */}
          <div className="my-2 w-full">
            <hr className="border-t border-gray-300 w-full" />
          </div>
          <RangeSlider/>
        </div>

        <div className="flex justify-end gap-6  p-3">
          <button className="btn-primary">Clear All</button>
          <button className="btn-secondary">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
