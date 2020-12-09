const { createSlice } = require("@reduxjs/toolkit");

const classSlice = createSlice({
  name: "classSlice",
  initialState: { fetching: true, classes: [], uploading: false },
  reducers: {
    setPreloadClasses: (state, action) => {
      state.fetching = false;
      const classes = action.payload;
      // DataGrid need id field
      const classesWithId = classes.map((claxx, index) => ({ ...claxx, id: index }));
      state.classes = classesWithId;
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.classes = action.payload.concat(state.classes);
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default classSlice.reducer;
export const { setPreloadClasses, startUploadFile, uploadFileSuccess, uploadFileFail } = classSlice.actions;
