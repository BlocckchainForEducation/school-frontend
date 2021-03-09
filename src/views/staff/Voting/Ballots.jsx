import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import Ballot from "./Ballot";
import { updateVoteBallots } from "./redux";

export default function Ballots(props) {
  const loading = useSelector((state) => state.votingSlice.fetching);
  const ballots = useSelector((state) => state.votingSlice.ballots);
  const numOfNewBallot = useSelector((state) => state.votingSlice.numOfNewBallot);

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchNewBallots();
  }, []);

  async function fetchNewBallots() {
    try {
      const response = await axios.get("staff/vote-requests?state=new");
      dp(updateVoteBallots(response.data));
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  let content =
    numOfNewBallot > 0 ? (
      ballots.map((request, index) => <Ballot request={request} key={index}></Ballot>)
    ) : (
      <Box py={2} mb={3} bgcolor="white">
        <Typography variant="h4" align="center">
          Chưa có thêm yêu cầu bỏ phiếu mới nào!
        </Typography>
      </Box>
    );

  return <div>{loading ? null : content}</div>;
}
