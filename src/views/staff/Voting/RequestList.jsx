import { Box, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { updateVoteRequestList } from "./redux";
import VoteRequest from "./VoteRequest";

export default function RequestList(props) {
  const loading = useSelector((state) => state.votingSlice.fetching);
  const voteRequests = useSelector((state) => state.votingSlice.voteRequests);
  const numOfNewVoteRequest = useSelector((state) => state.votingSlice.numOfNewVoteRequest);

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchNewVoteRequests();
  }, []);

  async function fetchNewVoteRequests() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/vote-requests?state=new`, {
      headers: { Authorization: getToken() },
    });
    if (!response.ok) {
      enqueueSnackbar(JSON.stringify(await response.json()), {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
    } else {
      const result = await response.json();
      dp(updateVoteRequestList(result));
    }
  }

  let content;
  if (numOfNewVoteRequest > 0) {
    content = voteRequests.map((request, index) => <VoteRequest request={request} key={index}></VoteRequest>);
  } else {
    content = (
      <Box py={2} mb={3} bgcolor="white">
        <Typography variant="h4" align="center">
          Chưa có thêm yêu cầu bỏ phiếu mới nào!
        </Typography>
      </Box>
    );
  }

  return <div>{loading ? null : content}</div>;
}
