import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "src/views/MakeRequest/redux";

export const resetStore = () => {
  return {
    type: "RESET_STORE",
  };
};

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({ schoolProfile: profileReducer });

export default configureStore({
  reducer: rootReducer,
});
