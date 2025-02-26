import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { courseList } from "../../Api/courseApi";
import { darkdropdown } from "../../Assets/index";
import { PATH_COURSE_DETAIL } from "../../Constants/RouteConstants";
import { courseListTableHeader } from "../../Constants/InputFields";

const CoursesListTable = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseList();
        setCourses(response?.data?.results || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const currentCourses = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return courses.slice(indexOfFirstItem, indexOfLastItem);
  }, [courses, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event?.target?.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="pt-2">
      {courses.length === 0 ? (
        <div className="text-center text-gray-500 mt-4 text-xl">
          No courses are added yet. Click on Add New to Add One!
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm mt-4 text-slate-800 bg-white">
              <thead>
                <tr className="text-left">
                  {courseListTableHeader.map((header, index) => (
                    <th key={index} className="border-b p-5">
                      <div className="flex items-center">
                        {header}
                        {["Mandatory", "No of assignees"].includes(header) && (
                          <img
                            className="pt-1 pl-2"
                            src={darkdropdown}
                            alt="caret icon"
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 p-6 text-sm text-neutral-700 cursor-pointer"
                    onClick={() =>
                      navigate(
                        PATH_COURSE_DETAIL.replace(":courseId", course.id)
                      )
                    }
                  >
                    <td className="border-b p-5 pl-6">{course.course_title}</td>
                    <td className="border-b p-5">
                      {course.is_mandatory ? "Yes" : "No"}
                    </td>
                    <td className="border-b p-5">{course.category_name}</td>
                    <td className="border-b p-5">{course.no_of_assignee}</td>
                    <td className="border-b p-5">{course.duration}</td>
                    <td className="border-b p-4 pr-6">
                      <span
                        className={`${
                          course.status === "draft"
                            ? "btn-draft"
                            : course.status === "active"
                            ? "btn-active"
                            : "btn-inactive"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination & Items Per Page Controls */}
          <div className="flex justify-between items-center mt-4 text-neutral-500">
            <div>
              Show
              <select
                className="ml-2 py-2 px-4 border border-neutral-300 shadow-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {[5, 10, 15, 20, 25].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>{" "}
              entries
            </div>

            <Pagination
              current={currentPage}
              total={courses.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesListTable;
