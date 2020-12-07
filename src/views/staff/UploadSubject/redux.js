const { createSlice } = require("@reduxjs/toolkit");

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState: { fetching: true, history: [], uploading: false },
  reducers: {
    setPreloadHistory: (state, action) => {
      state.fetching = false;
      state.history = action.payload;
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.history.push(action.payload);
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default subjectSlice.reducer;
export const { setPreloadHistory, startUploadFile, uploadFileSuccess, uploadFileFail } = subjectSlice.actions;
