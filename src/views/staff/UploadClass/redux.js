const { createSlice } = require("@reduxjs/toolkit");

const classSlice = createSlice({
  name: "classSlice",
  initialState: { fetching: true, classes: [], uploading: false },
  reducers: {
    setPreloadClasses: (state, action) => {
      state.fetching = false;
      // DataGrid need id field
      if (action.payload.length > 0) state.classes = action.payload.map((claxx, index) => ({ ...claxx, id: index + 1 }));
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.classes = action.payload.concat(state.classes).map((claxx, index) => ({ ...claxx, id: index + 1 }));
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default classSlice.reducer;
export const { setPreloadClasses, startUploadFile, uploadFileSuccess, uploadFileFail } = classSlice.actions;
