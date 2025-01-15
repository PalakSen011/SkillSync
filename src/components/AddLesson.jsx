import React from "react";

const AddLesson = () => {
  return <>
  <div className="ml-4  w-full m-4 bg-white">
          <div className="flex gap-4">
            {/* Lesson Name Input */}
            <div className="flex  flex-col">
              <label
                htmlFor="lessonName"
                className="text-sm text-neutral-500 font-medium mb-1"
              >
                Lesson Name
              </label>
              <input
                type="text"
                id="lessonName"
                className="border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            {/* Duration Input */}
            <div className="flex flex-col w-1/6">
              <label
                htmlFor="duration"
                className="text-sm text-neutral-500 font-medium mb-1"
              >
                Duration (min)
              </label>
              <input
                type="number"
                id="duration"
                className="border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            {/* Number Input */}
            <div className="flex flex-col w-1/6">
              <label
                htmlFor="lessonNumber"
                className="text-sm text-neutral-500 font-medium mb-1"
              >
                Number
              </label>
              <input
                type="text"
                id="number"
                className="border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          {/* Text Area */}
          <div className="mt-4 relative">
            <textarea
              id="description"
              className="border border-gray-300 px-3 py-2 text-sm w-full h-96"
            ></textarea>
            {/* Save Button */}
          </div>
          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button className="btn-secondary px-4 py-2">Save</button>
          </div>
        </div>
  </>;
};

export default AddLesson;
