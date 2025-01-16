import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "../redux/typeSlice";
import usersReducer from "../redux/usersSlice";
import courseReducer from "../redux/courseSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // use the default localStorage storage

const persistConfig = {
  key: "persist-key",
  storage, // Store in localStorage by default
};

const persistedReducer = persistReducer(persistConfig, usersReducer);
const coursePersistedReducer = persistReducer(persistConfig, courseReducer);

const appStore = configureStore({
  reducer: {
    type: typeReducer,
    courses: coursePersistedReducer,
    users: persistedReducer, // Persist users reducer
  },
});

const persistor = persistStore(appStore);

export { appStore, persistor };
