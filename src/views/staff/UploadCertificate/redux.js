const { createSlice } = require("@reduxjs/toolkit");

const certificateSlice = createSlice({
  name: "certificateSlice",
  initialState: { fetching: true, certificates: [], uploading: false },
  reducers: {
    setPreloadCertificates: (state, action) => {
      state.fetching = false;
      state.certificates = action.payload.map((cert, index) => ({ ...cert, id: index }));
    },
    startUploadFile: (state, action) => {
      state.uploading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.uploading = false;
      state.certificates = action.payload.concat(state.certificates);
    },
    uploadFileFail: (state, action) => {
      state.uploading = false;
    },
  },
});

export default certificateSlice.reducer;
export const { setPreloadCertificates, startUploadFile, uploadFileSuccess, uploadFileFail } = certificateSlice.actions;
