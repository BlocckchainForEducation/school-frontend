import { createSlice } from "@reduxjs/toolkit";

const votingSlice = createSlice({
  name: "votingSlice",
  initialState: { fetching: true, voteRequests: [], numOfNewVoteRequest: 0, privateKey: null },
  reducers: {
    updateVoteRequestList: (state, action) => {
      state.fetching = false;
      state.voteRequests = action.payload;
      state.numOfNewVoteRequest = action.payload.length;
    },
    // not use anymore, use collapse instead to make some effect improve UX
    removeVotedRequest: (state, action) => {
      state.voteRequests = state.voteRequests.filter((vote) => vote._id !== action.payload._id);
    },
    collapseVoteRequest(state, action) {
      const index = state.voteRequests.findIndex((vote) => vote.pubkey === action.payload.pubkey);
      state.voteRequests[index].in = false;
      state.numOfNewVoteRequest -= 1;
    },
    setPrivateKey: (state, action) => {
      state.privateKey = action.payload.privateKey;
    },
  },
});

export default votingSlice.reducer;
export const { updateVoteRequestList, removeVotedRequest, collapseVoteRequest, setPrivateKey } = votingSlice.actions;
