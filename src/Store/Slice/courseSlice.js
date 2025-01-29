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
      const { modId, testData } = action.payload;

      console.log("🚀 ~ Payload:", action.payload);

      // Find the index of the course with the given course_id
      const index = state.courses.findIndex(
        (course) => course && course.course_id === modId
      );

      if (index !== -1) {
        // Verify if `modules` exists in the course object
        if (Array.isArray(state.courses[index].modules.test)) {
          console.log(
            "🚀 ~ Current modules:",
            JSON.stringify(state.courses[index].modules)
          );

          // Replace the course modules with the new data
          state.courses[index].modules = testData;

          console.log(
            "🚀 ~ Updated modules:",
            JSON.stringify(state.courses[index].modules)
          );
          console.log("Course replaced successfully");
        } else {
          console.error(
            "🚀 ~ Error: The course does not have a valid `modules` property"
          );
        }
      } else {
        console.error("🚀 ~ Error: Course with the given ID not found");
      }

      // Optionally update `currentCourse` if it's the same course being replaced
      if (state.currentCourse?.course_id === modId) {
        state.currentCourse = { ...state.currentCourse, modules: testData };
        console.log(
          "🚀 ~ Updated currentCourse:",
          JSON.stringify(state.currentCourse)
        );
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
  },
});
export const { addCourse, replaceCourseById,deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
