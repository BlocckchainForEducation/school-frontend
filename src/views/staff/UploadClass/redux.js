const { createSlice } = require("@reduxjs/toolkit");

const classSlice = createSlice({
  name: "classSlice",
  initialState: { fetching: true, classes: [], uploading: false },
  reducers: {
    setPreloadClasses: (state, action) => {
      state.fetching = false;
      // DataGrid need id field
      state.classes = action.payload.map((subject, index) => ({ ...subject, id: index + 1 }));
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.classes = action.payload.concat(state.subjects).map((subject, index) => ({ ...subject, id: index + 1 }));
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default classSlice.reducer;
export const { setPreloadClasses, startUploadFile, uploadFileSuccess, uploadFileFail } = classSlice.actions;
