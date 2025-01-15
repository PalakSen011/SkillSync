import React from "react";
import CourseListTable from "../components/CourseListTable";

import filter from "../assets/filter.svg";
import searchIcon from "../assets/search.svg";
import dropDownIcon from "../assets/caretIcon.svg";

const CourseList = () => {
  return (
    <>
      <div className="text-xl font-semibold mb-5">All Courses</div>
      <div className="mt-3 flex items-center justify-between">
        {/* Left Section (Search and Filter) */}
        <div className="flex items-center gap-2">
          {/* Search Container */}
          <div className="relative">
            <input
              className="p-2 pl-10 pr-4 border border-neutral-300  font-light text-sm focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4"
            />
          </div>
          <button className="bg-white p-3 border border-neutral-300 ">
            <img className="h-4" src={filter} alt="filter" />
          </button>
        </div>
        {/* Right Section (Add New Button) */}
        <button className="btn-primary flex items-end ">Add New</button>
      </div>
      {/* CourseList Component */}
      <CourseListTable />
      <div className="flex flex-row text-neutral-500 mt-4 items-center ">
        Show
        <button className="bg-white py-2 px-4 border mr-1 ml-1 border-neutral-300 ">
          <div className="flex">
            <div className="pr-4 text-neutral-900">{9}</div>

            <img src={dropDownIcon} alt="" />
          </div>
        </button>
        entries
      </div>
    </>
  );
};

export default CourseList;
