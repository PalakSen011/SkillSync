import { createSlice } from "@reduxjs/toolkit";

// Initial state for the slice
const initialState = {
  Users: [], // List of users, persisted via redux-persist
  isAuthenticated: false,
  loggedInUser: null,
  userEmail: "",
  userEmailError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Action to add a new user to the state
    addUser: (state, action) => {
      const newUser = {
        id: state.Users.length,
        ...action.payload,
      };
      state.Users.push(newUser);
    },

    // Action to authenticate a user based on email and password
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.Users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.loggedInUser = user;
      } else {
        state.isAuthenticated = false;
        state.loggedInUser = null;
      }
    },

    // Action to validate if an email exists in the Users list
    setUserEmail: (state, action) => {
      const email = action.payload;
      const isEmail = state.Users.find((u) => u.email === email);

      if (isEmail) {
        state.userEmail = isEmail.email;
        state.userEmailError = false;
      } else {
        state.userEmailError = true;
      }
    },

    // Action to reset the email error state (e.g., when closing or resetting a form)
    resetUserEmail: (state) => {
      state.userEmailError = false;
      // state.userEmail = "";
    },

    // Action to reset the authentication state (e.g., during logout)
    resetAuthenticationState: (state) => {
      state.isAuthenticated = false;
      state.loggedInUser = null;
    },

    // Action to reset a user's password
    resetPassword: (state, action) => {
      const { userEmail, newPassword } = action.payload;
      console.log("🚀 ~ userEmail:", userEmail)
      console.log("🚀 ~ newPassword:", newPassword)
      const userIndex = state.Users.findIndex(
        (user) => user.email === userEmail
      );
      console.log("🚀 ~ userIndex:", userIndex);

      if (userIndex !== -1) {
        // If the user is found, update their password
        state.Users[userIndex].password = newPassword;
        state.userEmailError = false;
        state.userEmail = "";
        console.log(
          "🚀 ~ state.Users[userIndex].password:",
          state.Users[userIndex].password
        );
      } else {
        state.userEmailError = true;
      }
    },
  },
});

// Exporting the actions and reducer for use in the application
export const {
  addUser,
  loginUser,
  setUserEmail,
  resetPassword,
  resetAuthenticationState,
  resetUserEmail,
} = usersSlice.actions;

export default usersSlice.reducer;
