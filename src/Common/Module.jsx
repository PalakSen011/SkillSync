// import React from "react";
import Lesson from "../Common/Lesson";

const Module = ({ module, addLesson }) => {
  return (
    <div className="flex">
      <Lesson lessons={module.lessons} addLesson={addLesson} />
    </div>
  );
};

export default Module;