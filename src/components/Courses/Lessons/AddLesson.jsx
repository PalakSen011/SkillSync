import React, { useState, useEffect } from "react";
import InputField from "../../../Common/InputField";

const AddLesson = ({ lessonData, onSave }) => {
  const [lessonDetails, setLessonDetails] = useState({
    lessonName: "",
    duration: "",
    lessonNumber: "",
    description: "",
    isActive: false,
  });

  useEffect(() => {
    if (lessonData) {
      setLessonDetails({
        lessonName: lessonData?.lesson_name || "",
        duration: lessonData?.duration || "",
        lessonNumber: lessonData?.sequence || "",
        description: lessonData?.content || "",
        isActive: lessonData?.isActive || true,
      });
    } else {
      setLessonDetails({
        lessonName: "",
        duration: "",
        lessonNumber: "",
        description: "",
        isActive: false,
      });
    }
  }, [lessonData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLessonDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Trigger onSave callback with updated values
    onSave({
      lesson_id: lessonData?.lesson_id || null,
      lesson_name: name === "lessonName" ? value : lessonDetails.lessonName,
      duration: name === "duration" ? value : lessonDetails.duration,
      sequence: name === "lessonNumber" ? value : lessonDetails.lessonNumber,
      content: name === "description" ? value : lessonDetails.description,
      isActive: name === "isActive" ? checked : lessonDetails.isActive,
    });
  };

  const handleSave = () => {
    onSave({
      lesson_id: lessonData?.lesson_id || null,
      lesson_name: lessonDetails.lessonName,
      duration: lessonDetails.duration,
      sequence: lessonDetails.lessonNumber,
      content: lessonDetails.description,
      isActive: lessonDetails.isActive,
    });
  };

  return (
    <div className="ml-4 w-full m-4 bg-white">
      <div className="flex gap-4">
        {/* Lesson Name Input */}
        <InputField
          id="lessonName"
          name="lessonName"
          label="Lesson Name"
          required
          value={lessonDetails.lessonName}
          onChange={handleChange}
          placeholder="Enter lesson name"
        />

        {/* Duration Input */}
        <InputField
          id="duration"
          name="duration"
          label="Duration (min)"
          required
          value={lessonDetails.duration}
          onChange={handleChange}
          placeholder="e.g., 50"
          className="w-1/6"
        />

        {/* Number Input */}
        <InputField
          id="lessonNumber"
          name="lessonNumber"
          label="Number"
          required
          type="number"
          value={lessonDetails.lessonNumber}
          onChange={handleChange}
          placeholder="e.g., 1"
          className="w-1/6"
        />
      </div>

      {/* Text Area */}
      <div className="mt-4 relative">
        <label
          htmlFor="description"
          className="text-sm text-neutral-500 font-medium mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border border-gray-300 px-3 py-2 text-sm w-full h-96 resize-none"
          value={lessonDetails.description}
          onChange={handleChange}
          placeholder="Add a description for the lesson"
        ></textarea>
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