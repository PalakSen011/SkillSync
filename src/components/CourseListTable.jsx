import { useState } from "react";
import courses from "../utils/courseData.js";
import dropDownIcon from "../assets/caretIcon.svg";

const Courses = () => {
  const [copyCourses, setCopyCourses] = useState(courses);

  return (
    <div className="pt-2">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm mt-4 text-slate-800 bg-white">
          <thead>
            <tr className="text-left ">
              <th className="border-b p-5 pl-6">Name</th>
              <th className="flex border-b p-5 hide-on-mobile">
                <span>Mandatory</span>
                <img className="pt-1 pl-2" src={dropDownIcon} alt="caret icon" />
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
              <th className=" border-b p-5 hide-on-mobile">
                <div className="flex ">
                  <span>Course duration</span>
                  <img
                    className="pt-1 pl-2"
                    src={dropDownIcon}
                    alt="caret icon"
                  />
                </div>
              </th>
              <th className="border-b p-4 hide-on-mobile pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {copyCourses.map((course, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 p-6 text-sm text-neutral-700"
              >
                <td className="border-b p-5 pl-6 ">{course.course_title}</td>
                <td className="border-b p-5 truncate hide-on-mobile ">
                  {course.is_mandatory ? "Yes" : "No"}
                </td>
                <td className="border-b p-5 truncate  hide-on-mobile ">
                  {course.category}
                </td>
                <td className="border-b p-5 truncate hide-on-mobile">
                  {course.assignee}
                </td>
                <td className="border-b p-5 truncate ">{course.duration}</td>
                <td className="border-b p-4 truncate hide-on-mobile pr-6 ">
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
    </div>
  );
};

export default Courses;
