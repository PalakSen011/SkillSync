import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { delete_red, edit_Black } from "../../Assets/index";

import { deleteCourse } from "../../Store/Slice/courseSlice";

import { PATH_COURSES } from "../../Constants/RouteConstants";

import ConfirmationDelete from "../../Common/ConfirmationDelete";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find(
    (course) => course.course_id === parseInt(courseId)
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  // Handle back button click to navigate to the course list
  const handleBackClick = () => {
    navigate(PATH_COURSES);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    dispatch(deleteCourse(course.course_id));
    navigate(PATH_COURSES);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  // Handle edit button click
  const handleEditClick = () => {
    console.log("Edit clicked");
    navigate(`/edit-course/${courseId}`);
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
      <div className="min-w-full  mt-4  bg-white">
        <div className="min-w-full  mt-4 p-6 bg-white">
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
              <button
                className="p-2 border border-neutral-300"
                onClick={handleEditClick}
              >
                <img src={edit_Black} alt="Edit" className="" />
              </button>
              <button
                className="p-2 border border-neutral-300"
                onClick={handleDeleteClick}
              >
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
              <div className="mb-1 text-sm font-semibold">Category</div>
              <div className="text-sm text-neutral-500 font-light mb-1">
                {course.category}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-6 gap-6 text-slate-800">
        <div
          className={`py-3 px-14 bg-white font-semibold ${
            activeTab === "details"
              ? "text-green-500 border-b-2 border-b-green-500"
              : "hover:text-green-500 hover:border-b-2 border-b-transparent"
          }`}
        >
          <button onClick={() => setActiveTab("details")}>Details</button>
        </div>
        <div
          className={`py-3 px-10 bg-white font-semibold ${
            activeTab === "assignees"
              ? "text-green-500 border-b-2 border-b-green-500"
              : "hover:text-green-500 hover:border-b-2 border-b-transparent"
          }`}
        >
          <button onClick={() => setActiveTab("assignees")}>
            Assignees (28)
          </button>
        </div>
      </div>
      <div className="bg-white flex">{/* <Lesson /> */}</div>
      {showDeleteModal && (
        <ConfirmationDelete
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this course?"
        />
      )}
    </>
  );
};

export default CourseDetails;
