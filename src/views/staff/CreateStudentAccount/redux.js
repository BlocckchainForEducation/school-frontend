const { createSlice } = require("@reduxjs/toolkit");

const studentSlice = createSlice({
  name: "studentSlice",
  initialState: { fetching: true, history: [], uploading: false }, // history item: {time: "01/01/2020", profiles:[{studentId, name, email, department, publicKey, firstTimePassword}] }
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

export default studentSlice.reducer;
export const { setPreloadHistory, startUploadFile, uploadFileSuccess, uploadFileFail } = studentSlice.actions;
