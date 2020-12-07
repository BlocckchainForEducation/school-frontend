import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "src/views/MakeRequest/redux";
import votingReducer from "src/views/Voting/redux";
import bureauReducer from "src/views/CreateBureauAccount/redux";
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

const appReducer = combineReducers({ profileSlice: profileReducer, votingSlice: votingReducer, bureauSlice: bureauReducer });

export default configureStore({
  reducer: rootReducer,
});
