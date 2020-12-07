const { createSlice } = require("@reduxjs/toolkit");

const bureauSlice = createSlice({
  name: "bureauSlice",
  initialState: { fetching: true, history: [] }, // history item: {time: "01/01/2020", profiles:[{bureauId, name, email, department, publicKey, firstTimePassword}] }
  reducers: {
    setPreloadHistory: (state, action) => {
      state.fetching = false;
      state.history = action.payload;
    },
    addHistoryItem: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export default bureauSlice.reducer;
export const { setPreloadHistory, addHistoryItem } = bureauSlice.actions;
