import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import AddModule from "./Modules/AddModule";
import { addCourse } from "../../Store/Slice/courseSlice";
import CourseInputField from "../../Common/CourseInputField";
import DropdownField from "../../Common/DropdownField";

import { statusOptions, categoryOptions } from "../../Constants/Options";

const AddNewCourse = ({ onBackClick }) => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    category: "",
    status: "Draft",
    mandatory: false,
    modules: [],
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const targetCourse = useSelector((state) => state.courses.courses);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Calculate modulesCount and lessonsCount dynamically
    const modulesCount = courseDetails.modules.length;
    const lessonsCount = courseDetails.modules.reduce(
      (total, module) => total + (module.lessons ? module.lessons.length : 0),
      0
    );

    const course = {
      course_id: Date.now(),
      course_title: courseDetails.title,
      category: courseDetails.category,
      status: courseDetails.status,
      is_mandatory: courseDetails.mandatory,
      assignee: "John Doe",
      duration: "30 hours",
      modules: [
        {
          module_id: Date.now() + Math.random(),
          module_name: `Module ${modulesCount + 1}`,
          sequence: modulesCount + 1,
          type: "chapter",
          lessons: [
            {
              lesson_id: Date.now() + Math.random(),
              lesson_name: `Lesson ${lessonsCount + 1}`,
              duration: "",
              sequence: lessonsCount + 1,
              content: "",
            },
          ],

          test: [
            {
              question_id: Date.now() + Math.random(),
              question: "",
              options: [{}],
              type: "",
            },
          ],
        },
      ],
    };

    console.log("Final Course Details: ", course);
    dispatch(addCourse(course));
    setCourseDetails(course);
    setShow(true);
  };
  console.log("Updated courseDetails:", courseDetails);

  const handleFieldChange = (field, value) => {
    setCourseDetails((prev) => ({
      ...prev,
      [field]: field === "mandatory" ? Boolean(value) : value,
    }));
  };

  const updateTestInCourseDetails = (moduleId, testData) => {
    console.log("🚀 ~ updateTestInCourseDetails ~ testData:", testData);
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      modules: prevDetails.modules.map((module) =>
        module.module_id === moduleId ? { ...module, test: testData } : module
      ),
    }));
    dispatch(addCourse(courseDetails));
    console.log("🚀 ~ AddNewCourse ~ targetCourse:", targetCourse);
  };

  return (
    <>
      <Header onClick={onBackClick} />
      <div className="min-w-full font-sm mt-4 p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Course Details</div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mandatoryAll"
              className="w-4 h-4"
              onChange={(e) => handleFieldChange("mandatory", e.target.checked)}
            />
            <label htmlFor="mandatoryAll" className="text-sm">
              Mandatory to all
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4 mt-3">
            {/* Title Field */}
            <CourseInputField
              id="courseTitle"
              label="Title"
              required
              value={courseDetails.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="flex flex-col w-1/2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            {/* Category Dropdown */}
            <DropdownField
              id="category"
              label="Category"
              required
              error={errors.category}
              options={[
                { label: "Training", value: "Training" },
                { label: "Workshop", value: "Workshop" },
                { label: "Seminar", value: "Seminar" },
              ]}
              {...register("category", { required: "Category is required" })}
              onChange={(e) => handleFieldChange("category", e.target.value)} // Update state on change
            />
            <DropdownField
              id="status"
              label="Status"
              required
              error={errors.status}
              options={[
                { label: "Draft", value: "Draft" },
                { label: "Active", value: "Active", disabled: true },
                { label: "Inactive", value: "Inactive", disabled: true },
              ]}
              {...register("status", { required: "Status is required" })}
              onChange={(e) => handleFieldChange("status", e.target.value)} // Update state on change
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-5">
            <button type="submit" className="btn-secondary flex items-end">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Add Module Component */}

      {show && (
        <AddModule
          modules={courseDetails.modules}
          setModules={(newModules) => handleFieldChange("modules", newModules)}
          updateTestInCourseDetails={updateTestInCourseDetails}
        />
      )}
    </>
  );
};
export default AddNewCourse;
