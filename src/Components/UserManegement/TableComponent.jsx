import React, { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

const TableComponent = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState({});
  console.log("🚀 ~ TableComponent ~ expandedRows:", expandedRows);

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the row's expanded state
    }));
  };

  const tableHeader = [
    "Courses",
    "Score Achieved",
    "Time Taken",
    "No of Attempts",
    "Assigned Date",
    "Completed Date",
    "Task Status",
  ];

  return (
    <div className="mt-5">
      <table className="min-w-full table-auto border-collapse mt-4 text-slate-800 ">
        <thead className="bg-neutral-100 border-b-2">
          <tr className="text-left">
            {tableHeader.map((header, index) => (
              <th key={index} className="p-5">
                <div className="flex justify-evenly">{header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <React.Fragment key={index + Date.now()}>
              <tr
                className="border-b cursor-pointer "
                onClick={() => toggleRow(index)}
              >
                <td className="p-5  flex items-center">
                  {course.subCourses ? (
                    <span className="mr-2">
                      {expandedRows[index] ? <FaCaretDown /> : <FaCaretRight />}
                    </span>
                  ) : null}
                  {course.course}
                </td>
                <td className="p-5">{course.scoreAchieved}</td>
                <td className="p-5">{course.timeTaken}</td>
                <td className="p-5">{course.noOfAttempts}</td>
                <td className="p-5">{course.assignedDate}</td>
                <td className="p-5">{course.completedDate}</td>
                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded ${
                      course.taskStatus === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {course.taskStatus}
                  </span>
                </td>
              </tr>

              {/* Sub-courses - Only render when expanded */}
              {expandedRows[index] &&
                course.subCourses &&
                course.subCourses.map((subCourse, subIndex) => (
                  <tr
                    key={`${index}-${subIndex}`}
                    className="border-b bg-neutral-50"
                  >
                    <td className="p-5 pl-10">{subCourse.course}</td>
                    <td className="p-5">{subCourse.scoreAchieved}</td>
                    <td className="p-5">{subCourse.timeTaken}</td>
                    <td className="p-5">{subCourse.noOfAttempts}</td>
                    <td className="p-5">{subCourse.assignedDate}</td>
                    <td className="p-5">{subCourse.completedDate}</td>
                    <td className="p-5">{subCourse.taskStatus}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
