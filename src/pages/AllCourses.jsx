import React from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import AddNewCourse from "./AddNewCourse";

const AllCourses = () => {
  return (
    <>
    {/* going to make a conditon for the  showing list of courses and Add new course*/}
      {/* <CourseList/> */}
      <AddNewCourse/>
    </>
  );
};

export default AllCourses;
