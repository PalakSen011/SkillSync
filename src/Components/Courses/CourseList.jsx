import React, { useState } from "react";

import { Link } from "react-router-dom";

import CourseListTable from "./CourseListTable";
import FilterModal from "../../Common/FilterModal";
import { filter, search } from "../../Assets/index";
import { PATH_ADD_NEW_COURSE } from "../../Constants/RouteConstants";

const CourseList = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  return (
    <>
      <div className="text-xl font-semibold mb-5">All Courses</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex  items-center gap-2">
          {/* Search Container */}
          <div className="relative  ">
            <input
              className="p-2 pl-10 w-80 pr-4 border border-neutral-300  font-light text-sm focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <img
              src={search}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4"
            />
          </div>
          <button
            className="bg-white p-3 border border-neutral-300 items-end"
            onClick={handleFilterClick}
          >
            <img className="h-4" src={filter} alt="filter" />
          </button>
        </div>
        {/* Right Section (Add New Button) */}
        <Link to={PATH_ADD_NEW_COURSE}>
          <button className="btn-primary flex items-end">Add New</button>
        </Link>
      </div>
      {/* CourseList Component */}
      <CourseListTable />
      {showFilterModal && <FilterModal />}
    </>
  );
};

export default CourseList;
