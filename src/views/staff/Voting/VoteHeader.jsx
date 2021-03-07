import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";
import { collapseVoteRequest } from "./redux";

export default function VoteHeader({ request }) {
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdVote(decision, publicKeyOfRequest) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/vote`, {
      headers: { "Content-Type": "application/json", Authorization: getToken() },
      method: "POST",
      body: JSON.stringify({ decision, publicKeyOfRequest, privateKeyHex }),
    });
    if (!response.ok) {
      enqueueSnackbar(`${response.status}: ${await response.text()}`, ERR_TOP_CENTER);
    } else {
      dp(collapseVoteRequest({ publicKey: publicKeyOfRequest }));
      enqueueSnackbar("Bỏ phiếu thành công!", SUCCESS_BOTTOM_CENTER);
    }
  }

  return (
    <div>
      <Box bgcolor="white" px={2} py={1} display="flex" alignItems="center">
        <Box flexGrow={1} display="flex" alignItems="center">
          <Avatar src={request.imgSrc}></Avatar>
          <Box mx={2}>
            <Typography variant="h5">{request.universityName}</Typography>
          </Box>
        </Box>
        <Box pr={2} flexShrink={0}>
          <Button variant="contained" color="primary" onClick={(e) => hdVote("accept", request.publicKey)}>
            Đồng ý
          </Button>
        </Box>
        <Box flexShrink={0}>
          <Button onClick={(e) => hdVote("decline", request.publicKey)}>Từ chối</Button>
        </Box>
      </Box>
    </div>
  );
}
