import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { setPrivateKey, collapseVoteRequest } from "./redux";

export default function VoteHeader({ request }) {
  const privateKey = useSelector((state) => state.votingSlice.privateKey);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdVote(decision, publicKeyOfRequest) {
    if (!privateKey) {
      enqueueSnackbar("Hãy mở ví và chọn tài khoản!", { variant: "info", anchorOrigin: { vertical: "top", horizontal: "center" } });
      const result = await askPrivateKeyFromWallet();
      if (!result.ok) {
        enqueueSnackbar("Bạn cần cung cấp private key để có thể thực hiện bỏ phiếu!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        return;
      } else {
        // enqueueSnackbar("Đã nhận được private key từ ví!", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "center" } });
        dp(setPrivateKey({ privateKey: result.privateKey }));
        sendVote(decision, publicKeyOfRequest, result.privateKey);
      }
    } else {
      sendVote(decision, publicKeyOfRequest, privateKey);
    }
  }

  async function sendVote(decision, publicKeyOfRequest, privateKey) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/vote`, {
      headers: { "Content-Type": "application/json", Authorization: getToken() },
      method: "POST",
      body: JSON.stringify({ decision, publicKeyOfRequest, privateKey }),
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar(JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    } else {
      dp(collapseVoteRequest({ pubkey: publicKeyOfRequest }));
      enqueueSnackbar("Bỏ phiếu thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  async function askPrivateKeyFromWallet() {
    return new Promise((resolve, reject) => {
      window.postMessage({ type: "SIGN_REQUEST" }, "*");
      window.addEventListener("message", function (event) {
        if (event.data.type === "SIGN_RESPONSE") {
          if (event.data.accept) {
            const privKeyBase64 = event.data.account.privateKey;
            const privKeyHex = Buffer.from(privKeyBase64, "base64").toString("hex");
            return resolve({ ok: true, privateKey: privKeyHex });
          } else {
            return resolve({ ok: false });
          }
        }
      });
    });
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
