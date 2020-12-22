import { Subject } from "@material-ui/icons";

const { createSlice } = require("@reduxjs/toolkit");

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState: { fetching: true, subjects: [], uploading: false },
  reducers: {
    setPreloadSubjects: (state, action) => {
      state.fetching = false;
      // DataGrid need id field for display
      if (action.payload.length > 0) state.subjects = action.payload.map((subject, index) => ({ ...subject, id: index + 1 }));
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      // DataGrid need id field for display
      state.subjects = action.payload.concat(state.subjects).map((subject, index) => ({ ...subject, id: index + 1 }));
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default subjectSlice.reducer;
export const { setPreloadSubjects, startUploadFile, uploadFileSuccess, uploadFileFail } = subjectSlice.actions;
