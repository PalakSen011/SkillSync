import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  currentCourse: null,
  currentModule: null,
  currentLesson: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const data = action.payload;
      const existingCourse = state.courses.find(
        (course) => course.course_title === data.course_title
      );

      if (existingCourse) {
        console.log("Course already exists");
        return;
      }

      // const newCourse = {
      //   ...data,
      //   modules: [createNewModule()],
      // };

      state.courses.push(data);
      state.currentCourse = data;
      state.currentModule = data.modules[0];
      state.currentLesson = data.modules[0]?.lessons[0];
      // console.log("courses", JSON.stringify(state.courses));
    },
  },
});

export const {
  addCourse,
  
} = coursesSlice.actions;

export default coursesSlice.reducer;
