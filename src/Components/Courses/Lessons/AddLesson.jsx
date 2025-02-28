import React, { useState, useEffect } from "react";

import FieldTypeMapper from "../../../Common/FieldTypeMapper";
import { lessonFields } from "../../../Constants/InputFields";

const InitialLessonDetails = {
  lesson_name: "",
  duration: "",
  sequence: "",
  content: "",
};

const AddLesson = ({ lessonData, onSave }) => {
  const [lessonDetails, setLessonDetails] = useState(InitialLessonDetails);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lessonData) {
      setLessonDetails({
        lesson_name: lessonData?.lesson_name || "",
        duration: lessonData?.duration || "",
        sequence: lessonData?.sequence || "",
        content: lessonData?.content || "",
      });
    }
  }, [lessonData]);

  const handleChange = (field, value) => {
    setLessonDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!lessonDetails.lesson_name.trim()) {
      newErrors.lesson_name = "Lesson name is required";
    }

    if (!lessonDetails.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (isNaN(lessonDetails.duration)) {
      newErrors.duration = "Duration must be a number";
    }

    if (!lessonDetails.sequence.trim()) {
      newErrors.sequence = "Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ lesson_id: lessonData?.lesson_id || null, ...lessonDetails });
    }
  };

  return (
    <div className="ml-4 w-full m-4 bg-white">
      <div className="flex gap-4">
        <FieldTypeMapper
          fields={lessonFields}
          filters={lessonDetails}
          onChange={handleChange}
          errors={errors}
        />
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          className="btn-secondary px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddLesson;
