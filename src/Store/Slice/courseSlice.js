import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  currentCourse: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const data = action.payload;
      const existingCourse = state.courses.find(
        (course) => course && course.course_title === data.course_title
      ); 

      if (existingCourse) {
        console.log("Course already exists");
        return;
      }

      state.courses.push(data);
      state.currentCourse = data;
    },
    replaceCourseById: (state, action) => {
      const { courseDetails } = action.payload;
      console.log("🚀 ~ courseDetails:", courseDetails)

      // Check if the course with the same ID exists
      const courseIndex = state.courses.findIndex(
        (course) => course.course_id === courseDetails.course_id
      );
      console.log("🚀 ~ courseIndex:", courseIndex)

      if (courseIndex !== -1) {
        state.courses[courseIndex] = {
          ...state.courses[courseIndex],
          ...courseDetails,
        };

        console.log(
          "🚀 ~ Updated course:",
          JSON.stringify(state.courses[courseIndex])
        );
        state.currentCourse = state.courses[courseIndex];
        console.log("🚀 ~ currentCourse:", state.currentCourse)
        console.log("Course replaced successfully");
      } else {
        console.error("🚀 ~ Error: Course with the given ID not found");
      }
    },

    deleteCourse: (state, action) => {
      const courseId = action.payload;
      state.courses = state.courses.filter(
        (course) => course.course_id !== courseId
      );
      // Optionally reset currentCourse if the deleted course was the current one
      if (state.currentCourse?.course_id === courseId) {
        state.currentCourse = null;
      }
    },
    publishCourse: (state) => {
      if (state.currentCourse) {
        // Find the course in the courses array and update its status
        const courseIndex = state.courses.findIndex(
          (course) => course.course_id === state.currentCourse.course_id
        );

        if (courseIndex !== -1) {
          // Update the status of the course
          state.courses[courseIndex].status = "Active";
        }
      }
    },
  },
});

export const { addCourse, replaceCourseById, deleteCourse, publishCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
