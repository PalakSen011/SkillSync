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

      // Check if currentCourse exists and has modules
      if (state.currentCourse && Array.isArray(state.currentCourse.modules)) {
        // Find the index of the module within currentCourse using modId
        const moduleIndex = state.currentCourse.modules.findIndex(
          (module) => module && module.module_id === modId
        );

        if (moduleIndex !== -1) {
          // Replace the module with the new data (testData)
          state.currentCourse.modules[moduleIndex] = {
            ...state.currentCourse.modules[moduleIndex],
            ...testData,
          };

          console.log(
            "🚀 ~ Updated module:",
            JSON.stringify(state.currentCourse.modules[moduleIndex])
          );
          console.log("Module replaced successfully");
        } else {
          console.error("🚀 ~ Error: Module with the given ID not found");
        }
      } else {
        console.error("🚀 ~ Error: 'currentCourse' or 'modules' is not valid");
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
export const { addCourse, replaceCourseById, deleteCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
