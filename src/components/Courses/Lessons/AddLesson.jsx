import React, { useState, useEffect } from "react";

const AddLesson = ({ lessonData, onSave }) => {
  const [lessonName, setLessonName] = useState(lessonData?.lesson_name || "");
  const [duration, setDuration] = useState(lessonData?.duration || "");
  const [lessonNumber, setLessonNumber] = useState(lessonData?.sequence || "");
  const [description, setDescription] = useState(lessonData?.content || "");

  useEffect(() => {
    // Update state if lessonData changes (for editing an existing lesson)
    if (lessonData) {
      setLessonName(lessonData.lesson_name || "");
      setDuration(lessonData.Duration || "");
      setLessonNumber(lessonData.sequence || "");
      setDescription(lessonData.content || "");
    }
  }, [lessonData]);

  // Handle input changes and immediately update lesson data
  const handleChange = (field, value) => {
    // Update state based on field
    switch (field) {
      case "lessonName":
        setLessonName(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "lessonNumber":
        setLessonNumber(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    onSave({
      lesson_id: lessonData.lesson_id, 
      lesson_name: lessonName, 
      duration: duration, 
      sequence: lessonNumber,
      content: description, 
    }); 
  };

  return (
    <>
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
              value={lessonName}
              onChange={(e) => handleChange("lessonName", e.target.value)}
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
              value={duration}
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
              value={lessonNumber}
              onChange={(e) => handleChange("lessonNumber", e.target.value)}
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
            value={description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add a description for the lesson"
          ></textarea>
        </div>
        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            className="btn-secondary px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            // onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddLesson;
