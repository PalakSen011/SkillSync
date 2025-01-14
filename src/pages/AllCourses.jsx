import React from "react";
import filter from "../assets/filter.svg";
import searchIcon from "../assets/search.svg"; // Add your search icon here
import { Link } from "react-router-dom";
import CourseList from "../components/CourseList";

const AllCourses = () => {
  return (
    <>
      <div className="mb-5">All Courses</div>
      <div>
        <div className="mt-3 mb-3 flex justify-between items-center">
          {/* Search Container */}
          <div className="relative">
            <input
              className="p-2 pl-10 pr-4 border border-neutral-300 rounded-md font-light text-base focus:outline-none w-full"
              type="text"
              name=""
              id=""
              placeholder="Search"
            />
            <img
              src={searchIcon} // Use the appropriate search icon path here
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5"
            />
          </div>
          <button className="bg-white p-3 border border-neutral-300 rounded-md ml-2">
            <img className="h-4" src={filter} alt="" />
          </button>

          {/* Add New Button */}
          <div>
            <Link className="p-4 py-1 border font-light border-green-600 text-black">
              Add new
            </Link>
          </div>
        </div>
      </div>
      <CourseList/>
    </>
  );
};

export default AllCourses;
