import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "./Slice/typeSlice";
import usersReducer from "./Slice/usersSlice";
import courseReducer from "./Slice/courseSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // use the default localStorage storage

// Separate persist configurations
const usersPersistConfig = {
  key: "users-persist-key",
  storage, // Store in localStorage by default
};

const coursesPersistConfig = {
  key: "courses-persist-key",
  storage, // Store in localStorage by default
};

// Persist reducers separately
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
const persistedCoursesReducer = persistReducer(coursesPersistConfig, courseReducer);

const appStore = configureStore({
  reducer: {
    type: typeReducer, // Not persisted
    users: persistedUsersReducer, // Persist users reducer
    courses: persistedCoursesReducer, // Persist courses reducer
  },
});

const persistor = persistStore(appStore);

export { appStore, persistor };
