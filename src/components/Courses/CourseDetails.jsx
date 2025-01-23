import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "rc-pagination";
import dropDownIcon from "../assets/caretIcon.svg";
import "rc-pagination/assets/index.css";

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses); // Fetch courses from Redux store
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(9); // Items per page

  // Calculate the displayed courses based on the current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-2">
      {courses.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No courses are added yet.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm mt-4 text-slate-800 bg-white">
              <thead>
                <tr className="text-left">
                  <th className="border-b p-5 pl-6">Name</th>
                  <th className="flex border-b p-5 hide-on-mobile">
                    <span>Mandatory</span>
                    <img
                      className="pt-1 pl-2"
                      src={dropDownIcon}
                      alt="caret icon"
                    />
                  </th>
                  <th className="border-b p-5 hide-on-mobile">Category</th>
                  <th className="flex border-b p-5 hide-on-mobile">
                    <span>No of assignees</span>
                    <img
                      className="pt-1 pl-2"
                      src={dropDownIcon}
                      alt="caret icon"
                    />
                  </th>
                  <th className="border-b p-5 hide-on-mobile">Course duration</th>
                  <th className="border-b p-4 hide-on-mobile pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 p-6 text-sm text-neutral-700"
                  >
                    <td className="border-b p-5 pl-6">{course.course_title}</td>
                    <td className="border-b p-5 hide-on-mobile">
                      {course.is_mandatory ? "Yes" : "No"}
                    </td>
                    <td className="border-b p-5 hide-on-mobile">
                      {course.category}
                    </td>
                    <td className="border-b p-5 hide-on-mobile">
                      {course.assignee}
                    </td>
                    <td className="border-b p-5">{course.duration}</td>
                    <td className="border-b p-4 hide-on-mobile pr-6">
                      <span
                        className={
                          course.status === "Draft"
                            ? "btn-draft"
                            : course.status === "Active"
                            ? "btn-active"
                            : "btn-Inactive"
                        }
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dropdown for selecting items per page */}
          <div className="flex justify-between">
            <div className="flex-row text-neutral-500 mt-4">
              Show
              <select
                className="ml-2 py-2 px-4 border border-neutral-300 shadow-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>{" "}
              entries
            </div>

            {/* Pagination controls */}
            <div className="mt-4 flex justify-center">
              <Pagination
                current={currentPage}
                total={courses.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
