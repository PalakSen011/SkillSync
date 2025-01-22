import { createSlice } from "@reduxjs/toolkit";

const createNewLesson = (lessonsCount = 0) => ({
  lesson_id: Date.now(),
  lesson_name: `Lesson ${lessonsCount + 1}`,
  Duration: "50min",
  sequence: lessonsCount + 1,
  content: "test content",
});

const createNewModule = (modulesCount = 0, lessonsCount = 0) => ({
  module_id: Date.now(),
  module_name: `Module ${modulesCount + 1}`,
  sequence: modulesCount + 1,
  type: "chapter",
  lessons: [createNewLesson(lessonsCount)],
});
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

      const newCourse = {
        ...data,
        modules: [createNewModule()],
      };

      state.courses.push(newCourse);
      state.currentCourse = newCourse;
      state.currentModule = newCourse.modules[0];
      state.currentLesson = newCourse.modules[0]?.lessons[0];
      // console.log("courses", JSON.stringify(state.courses));
    },
  },
});

export const {
  addCourse,
  
} = coursesSlice.actions;

export default coursesSlice.reducer;
