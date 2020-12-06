import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: { fetching: true, universityName: "", nameInEnglish: "", address: "", email: "", phone: "", pubkey: "", description: "", imgSrc: "" },
  reducers: {
    setProfile: (state, action) => {
      Object.assign(state, action.payload);
      state.fetching = false;
    },
    updateImgSrc: (state, action) => {
      state.imgSrc = action.payload;
    },
  },
});

export const { setProfile, updateImgSrc } = profileSlice.actions;
export default profileSlice.reducer;
