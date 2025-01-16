import React from "react";

import AddLesson from "./AddLesson";
import AddTest from "./AddTest";
import Lesson from "./Lesson";

const Module = () => {
  return (
    <>
      <div className=" flex">
        <Lesson />
        {/* Main content area with input fields */}
        <AddLesson/>
        {/* <AddTest /> */}
      </div>
    </>
  );
};

export default Module;
