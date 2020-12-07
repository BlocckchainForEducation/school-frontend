import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { collapseVoteRequest } from "./redux";

export default function VoteHeader({ request }) {
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdVote(decision, publicKeyOfRequest) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/vote`, {
      headers: { "Content-Type": "application/json", Authorization: getToken() },
      method: "POST",
      body: JSON.stringify({ decision, publicKeyOfRequest, privateKeyHex }),
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar(JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    } else {
      dp(collapseVoteRequest({ pubkey: publicKeyOfRequest }));
      enqueueSnackbar("Bỏ phiếu thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <div>
      <Box bgcolor="white" px={2} py={1} display="flex" alignItems="center">
        <Box flexGrow={1} display="flex" alignItems="center">
          <Avatar></Avatar>
          <Box mx={2}>
            <Typography variant="h5">{request.universityName}</Typography>
          </Box>
        </Box>
        <Box pr={2} flexShrink={0}>
          <Button variant="contained" color="primary" onClick={(e) => hdVote("accept", request.pubkey)}>
            Đồng ý
          </Button>
        </Box>
        <Box flexShrink={0}>
          <Button onClick={(e) => hdVote("decline", request.pubkey)}>Từ chối</Button>
        </Box>
      </Box>
    </div>
  );
}
