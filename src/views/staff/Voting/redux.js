import { createSlice } from "@reduxjs/toolkit";

const votingSlice = createSlice({
  name: "votingSlice",
  initialState: { fetching: true, Ballots: [], numOfNewBallot: 0, privateKey: null },
  reducers: {
    updateVoteBallots: (state, action) => {
      state.fetching = false;
      state.Ballots = action.payload;
      state.numOfNewBallot = action.payload.length;
    },
    collapseBallot(state, action) {
      const index = state.Ballots.findIndex((vote) => vote.publicKey === action.payload.publicKey);
      state.Ballots[index].in = false;
      // dont remove numOfNewBallot, it is difference from Ballots.length
      state.numOfNewBallot -= 1;
    },
  },
});

export default votingSlice.reducer;
export const { updateVoteBallots, removeVotedRequest, collapseBallot } = votingSlice.actions;
