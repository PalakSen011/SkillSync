import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
      
    },
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
        state.courses.push(action.payload);
        console.log("🚀 ~ initialState.courses:", JSON.stringify(state.courses));
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
