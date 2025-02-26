import React from "react";

const ProgressBar = ({ label, value, color }) => {
  return (
    <div className="mb-8 ">
      <div className="flex justify-between text-neutral-500 text-sm ">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full"
          style={{ width: `${(value / 27) * 100}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};
const CourseProgress = () => {
  return (
    <div className="items-center ">
      {/* Progress Bars */}
      <div className="flex-1">
        <ProgressBar
          label="Completed"
          value={9}
          color="rgba(56, 199, 118, 1)"
        />
        <ProgressBar
          label="Inprocess"
          value={10}
          color="rgba(255, 138, 0, 1)"
        />
        <ProgressBar label="Overdue" value={3} color="rgba(255, 68, 88, 1)" />
      </div>
    </div>
  );
};

export default CourseProgress;
