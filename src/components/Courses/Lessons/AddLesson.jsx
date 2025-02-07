import React, { useState, useEffect } from "react";

const InitialLessonDetails = {
  lesson_name: "",
  duration: "",
  sequence: "",
  content: "",
};
const AddLesson = ({ lessonData, onSave }) => {
  const [lessonDetails, setLessonDetails] = useState(InitialLessonDetails);

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

  const handleSave = () => {
    onSave({ lesson_id: lessonData?.lesson_id || null, ...lessonDetails });
  };

  return (
    <div className="ml-4 w-full m-4 bg-white">
      <div className="flex gap-4">
        {/* Lesson Name Input */}
        <div className="flex flex-col">
          <label
            htmlFor="lessonName"
            className="text-sm text-neutral-500 font-medium mb-1"
          >
            Lesson Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lessonName"
            className="border border-gray-300 px-3 py-2 text-sm"
            value={lessonDetails.lesson_name}
            onChange={(e) => handleChange("lesson_name", e.target.value)}
            placeholder="Enter lesson name"
          />
        </div>

        {/* Duration Input */}
        <div className="flex flex-col w-1/6">
          <label
            htmlFor="duration"
            className="text-sm text-neutral-500 font-medium mb-1"
          >
            Duration (min) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="duration"
            className="border border-gray-300 px-3 py-2 text-sm"
            value={lessonDetails.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="e.g., 50"
          />
        </div>

        {/* Number Input */}
        <div className="flex flex-col w-1/6">
          <label
            htmlFor="lessonNumber"
            className="text-sm text-neutral-500 font-medium mb-1"
          >
            Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="lessonNumber"
            className="border border-gray-300 px-3 py-2 text-sm"
            value={lessonDetails.sequence}
            onChange={(e) => handleChange("sequence", e.target.value)}
            placeholder="e.g., 1"
          />
        </div>
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
          className="border border-gray-300 px-3 py-2 text-sm w-full h-40 resize-none"
          value={lessonDetails.content}
          onChange={(e) => handleChange("content", e.target.value)}
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
