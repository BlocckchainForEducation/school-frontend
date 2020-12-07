import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "src/views/staff/MakeRequest/redux";
import votingReducer from "src/views/staff//Voting/redux";
import bureauReducer from "src/views/staff/CreateBureauAccount/redux";
import teacherReducer from "src/views/staff/CreateTeacherAccount/redux";
import privateKeyReducer from "./redux";

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

const appReducer = combineReducers({
  privateKeySlice: privateKeyReducer,
  profileSlice: profileReducer,
  votingSlice: votingReducer,
  bureauSlice: bureauReducer,
  teacherSlice: teacherReducer,
});

export default configureStore({
  reducer: rootReducer,
});
