import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import CourseInputField from "../../Common/CourseInputField";
import DropdownField from "../../Common/DropdownField";
import { replaceCourseById } from "../../Store/Slice/courseSlice";
import { statusOptions, categoryOptions } from "../../Constants/Options";
import { useParams } from "react-router-dom";
import AddModule from "./Modules/AddModule";

const EditCourse = ({ onBackClick }) => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) =>
    state.courses.courses.find(
      (course) => course.course_id === parseInt(courseId)
    )
  );

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    category: "",
    status: "Draft",
    mandatory: false,
    modules: [],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (course) {
      setCourseDetails({
        title: course.course_title,
        category: course.category,
        status: course.status,
        mandatory: course.is_mandatory,
        modules: course.modules,
      });
    }
  }, [course]);

  const onSubmit = (data) => {
    const updatedCourse = {
      ...courseDetails,
      course_title: courseDetails.title,
      category: courseDetails.category,
      status: courseDetails.status,
      is_mandatory: courseDetails.mandatory,
    };

    dispatch(replaceCourseById(updatedCourse));
    // Redirect after updating
    onBackClick();
  };

  const handleFieldChange = (field, value) => {
    setCourseDetails((prev) => ({
      ...prev,
      [field]: field === "mandatory" ? Boolean(value) : value,
    }));
  };

  return (
    <>
      <Header onClick={onBackClick} />
      <div className="min-w-full font-sm mt-4 p-5 bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4 mt-3">
            <CourseInputField
              id="courseTitle"
              label="Title"
              required
              value={courseDetails.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <DropdownField
              id="category"
              label="Category"
              required
              options={categoryOptions}
              value={courseDetails.category}
              onChange={(e) => handleFieldChange("category", e.target.value)}
            />
            <DropdownField
              id="status"
              label="Status"
              required
              options={statusOptions}
              value={courseDetails.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-5">
            <button type="submit" className="btn-secondary flex items-end">
              Save
            </button>
          </div>
        </form>
      </div>
      <AddModule
        modules={courseDetails.modules}
        setModules={(newModules) => handleFieldChange("modules", newModules)}
        updateTestInCourseDetails={updateTestInCourseDetails}
      />
    </>
  );
};

export default EditCourse;
