const { createSlice } = require("@reduxjs/toolkit");

const privateKeySlice = createSlice({
  name: "privateKeySlice",
  initialState: { privateKeyHex: null },
  reducers: {
    setPrivateKeyHex: (state, action) => {
      state.privateKeyHex = action.payload.privateKeyHex;
    },
  },
});

export default privateKeySlice.reducer;
export const { setPrivateKeyHex } = privateKeySlice.actions;
