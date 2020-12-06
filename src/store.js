import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "src/views/MakeRequest/redux";
import votingReducer from "src/views/Voting/redux";
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

const appReducer = combineReducers({ profileSlice: profileReducer, votingSlice: votingReducer });

export default configureStore({
  reducer: rootReducer,
});
