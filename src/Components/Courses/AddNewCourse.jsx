import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "./Header";
import AddModule from "./Modules/AddModule";
import {DropdownField, InputField} from "../../Common"

import { addCourse, replaceCourseById } from "../../Store/Slice/courseSlice";
import { statusOptions, categoryOptions } from "../../Constants/Options";
import { generateUpdatedCourse } from "../../Utils/courseUtils";

// Define initial course details as a constant
const InitialCourseDetails = {
  title: "",
  category: "",
  status: "Draft",
  mandatory: false,
  modules: [],
};

const AddNewCourse = ({ onBackClick }) => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [show, setShow] = useState(false);
  const [courseDetails, setCourseDetails] = useState(InitialCourseDetails);

  const courses = useSelector((state) => state?.courses?.courses || []);
  const course = courses?.find(
    (course) => course?.course_id === parseInt(courseId)
  );


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (course) {
      setCourseDetails({
        title: course?.course_title || "",
        category: course?.category || "",
        status: course?.status || "Draft",
        mandatory: course?.is_mandatory || false,
        modules: course?.modules || [],
      });
      setShow(true);
    }
  }, [course]);

  // Function to submit the form
  const onSubmit = () => {
    const updatedDetails = {
      ...courseDetails,
      title: courseDetails?.title?.trim() || "",
    };

    const modulesCount = updatedDetails?.modules?.length || 0;
    const lessonsCount = updatedDetails?.modules?.reduce(
      (total, module) => total + (module?.lessons?.length || 0),
      0
    );

    const updatedCourse = generateUpdatedCourse(
      courseId,
      updatedDetails,
      modulesCount,
      lessonsCount
    );

    console.log("🚀 ~ onSubmit ~ updatedCourse:", updatedCourse);
    dispatch(addCourse(updatedCourse));
    setCourseDetails(updatedCourse);
    setShow(true);
  };

  // Function to handle field change
  const handleFieldChange = (field, value) => {
    const updatedValue = field === "mandatory" ? Boolean(value) : value;

    setCourseDetails((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  // Function to update test in course details
  const updateTestInCourseDetails = (moduleId, testData) => {
    const getUpdatedDetails = (prevDetails) => ({
      ...prevDetails,
      modules:
        prevDetails?.modules?.map((module) =>
          module?.module_id === moduleId
            ? { ...module, test: testData }
            : module
        ) || [],
    });

    setCourseDetails((prevDetails) => {
      const updatedDetails = getUpdatedDetails(prevDetails);
      dispatch(replaceCourseById({ courseDetails: updatedDetails }));
      console.log("🚀 ~ setCourseDetails ~ courseDetails:", updatedDetails);
      return updatedDetails;
    });
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
            <InputField
              id="courseTitle"
              label="Title"
              type="text"
              required
              errors={errors?.title}
              value={courseDetails?.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="flex flex-col w-1/2"
            />

            <DropdownField
              id="category"
              label="Category"
              required
              error={errors?.category}
              options={categoryOptions}
              {...register("category", { required: "Category is required" })}
              onChange={(e) => handleFieldChange("category", e.target.value)}
            />
            <DropdownField
              id="status"
              label="Status"
              required
              error={errors?.status}
              options={statusOptions}
              {...register("status", { required: "Status is required" })}
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

      {show && (
        <AddModule
          modules={courseDetails?.modules || []}
          setModules={(newModules) => handleFieldChange("modules", newModules)}
          updateTestInCourseDetails={updateTestInCourseDetails}
        />
      )}
    </>
  );
};

export default AddNewCourse;
