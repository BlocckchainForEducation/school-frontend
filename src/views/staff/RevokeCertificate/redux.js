const { createSlice } = require("@reduxjs/toolkit");

const revokeCertificateSlice = createSlice({
  name: "revokeCertificateSlice",
  initialState: { certificates: [] },
  reducers: {
    setCertificates: (state, action) => {
      state.certificates = action.payload;
    },
  },
});

export default revokeCertificateSlice.reducer;
export const { setCertificates } = revokeCertificateSlice.actions;
