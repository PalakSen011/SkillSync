import React, { useState } from "react";
import CourseList from "./CourseList";
import AddNewCourse from "./AddNewCourse";
import CourseDeatils from "./CourseDetails";

const AllCourses = () => {
  // State to track which component to display
  const [showAddCourse, setShowAddCourse] = useState(false);

  // Handlers to switch between components
  const handleAddNewClick = () => setShowAddCourse(true);
  const handleBackClick = () => setShowAddCourse(false);

  return (
    <>
      {showAddCourse ? (
        <AddNewCourse onBackClick={handleBackClick} />
      ) : (
        <CourseList onAddNewClick={handleAddNewClick} />
      )}
      {/* <CourseDeatils/> */}
    </>
  );
};

export default AllCourses;
