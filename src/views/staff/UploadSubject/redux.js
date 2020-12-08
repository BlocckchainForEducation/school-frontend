const { createSlice } = require("@reduxjs/toolkit");

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState: { fetching: true, subjects: [], uploading: false },
  reducers: {
    setPreloadSubjects: (state, action) => {
      state.fetching = false;
      state.subjects = action.payload;
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.subjects = action.payload.concat(state.subjects);
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default subjectSlice.reducer;
export const { setPreloadSubjects, startUploadFile, uploadFileSuccess, uploadFileFail } = subjectSlice.actions;
