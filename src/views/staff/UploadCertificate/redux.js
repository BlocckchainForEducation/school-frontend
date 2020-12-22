const { createSlice } = require("@reduxjs/toolkit");

const certificateSlice = createSlice({
  name: "certificateSlice",
  initialState: { fetching: true, certificates: [], uploading: false },
  reducers: {
    setPreloadCertificates: (state, action) => {
      state.fetching = false;
      // DataGrid need id
      if (action.payload.length > 0) state.certificates = action.payload.map((cert, index) => ({ ...cert, id: index + 1 }));
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      // DataGrid need id
      state.certificates = action.payload.concat(state.certificates).map((cert, index) => ({ ...cert, id: index + 1 }));
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default certificateSlice.reducer;
export const { setPreloadCertificates, startUploadFile, uploadFileSuccess, uploadFileFail } = certificateSlice.actions;
