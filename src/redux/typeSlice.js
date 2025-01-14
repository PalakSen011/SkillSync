import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice to manage the "type" state
const typeSlice = createSlice({
  name: "type", 
  initialState: {
    type: "signIn", 
  },
  reducers: {
    // Action to update the "type" in the state
    changeType: (state, action) => {
      state.type = action.payload;
    },
  },
});
export default typeSlice.reducer;
export const { changeType } = typeSlice.actions;
