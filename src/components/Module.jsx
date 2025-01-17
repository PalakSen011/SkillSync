import React from "react";

import AddLesson from "./AddLesson";
import Lesson from "./Lesson";

const Module = () => {
  return (
    <>
      <div className=" flex">
        <Lesson />
        {/* Main content area with input fields */}
        {/* <AddLesson /> */}
      </div>
    </>
  );
};

export default Module;
