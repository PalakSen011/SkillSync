import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { edit_module, delete_red, edit_Black } from "../../Assets/index";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = useSelector((state) =>
    state.courses.courses.find(
      (course) => course.course_id === parseInt(courseId)
    )
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  // Handle back button click to navigate to the course list
  const handleBackClick = () => {
    navigate("/courses");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold mb-5">Course Details</div>
        <div>
          <button
            className="btn-primary flex items-end"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      </div>
      <div className="min-w-full font-sm mt-4 p-5 bg-white">
        <div className="min-w-full font-sm mt-4 p-5 bg-white">
          <div className="flex justify-between">
            <div>
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
              </span>{" "}
            </div>
            <div className="flex gap-4">
              <button className="p-2 border border-neutral-300">
                <img src={edit_Black} alt="Edit" className="" />
              </button>
              <button className="p-2 border border-neutral-300">
                <img src={delete_red} alt="Delete" className="h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 ml-1 flex">
            <div className="flex flex-col w-1/3">
              <div className="mb-1 text-sm font-semibold">Title</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.course_title}
              </div>
            </div>
            <div className="flex flex-col w-1/6">
              <div className="mb-1 text-sm font-semibold">Type</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.category}
              </div>
            </div>
            <div className="flex flex-col w-1/6">
              <div className="mb-1 text-sm font-semibold">Mandatory</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.is_mandatory ? "Yes" : "No"}
              </div>
            </div>
            <div className="flex flex-col w-1/6">
              <div className="mb-1 text-sm font-semibold">Assignee</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.assignee}
              </div>
            </div>
            <div className="flex flex-col w-1/6">
              <div className="mb-1 text-sm font-semibold">Duration</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
