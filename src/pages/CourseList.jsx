import React from "react";
import CourseListTable from "../components/CourseListTable";

import filter from "../assets/filter.svg";
import searchIcon from "../assets/search.svg";
import dropDownIcon from "../assets/caretIcon.svg";

const CourseList = ({ onAddNewClick }) => {
  
  return (
    <>
      <div className="text-xl font-semibold mb-5">All Courses</div>
      <div className="mt-3 flex items-center justify-between">
        {/* Left Section (Search and Filter) */}
        <div className="flex  items-center gap-2">
          {/* Search Container */}
          <div className="relative  ">
            <input
              className="p-2 pl-10 w-80 pr-4 border border-neutral-300  font-light text-sm focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4"
            />
          </div>
          <button className="bg-white p-3 border border-neutral-300 items-end">
            <img className="h-4" src={filter} alt="filter" />
          </button>
        </div>
        {/* Right Section (Add New Button) */}
        <button className="btn-primary flex items-end" onClick={onAddNewClick}>
          Add New
        </button>
      </div>
      {/* CourseList Component */}
      <CourseListTable  />
      
    </>
  );
};

export default CourseList;
