import { Box, Button, Grid, IconButton, InputAdornment, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import "date-fns";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { setProfile } from "./redux";
const { PrivateKey } = require("eciesjs");

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.primary.main,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black",
    },
  },
  head: {
    width: "95%",
    margin: "auto",
    padding: theme.spacing(2.5, 2),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    position: "relative", // this bring head foreground
  },
  body: { width: "100%", marginTop: "-32px" },
  box: {
    padding: theme.spacing(8, 3, 3, 3),
    "& > *": {
      marginBottom: theme.spacing(4),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
}));

export default function ProfileForm() {
  const cls = useStyles();
  const profile = useSelector((state) => state.profileSlice);
  const [state, setState] = useState(profile);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const disable = Boolean(profile.state === "voting" || profile.state === "accepted" || profile.state === "declined");

  async function hdSubmit(e) {
    if (!profile.imgSrc) {
      enqueueSnackbar("Cần bổ sung ảnh đại diện trước khi đăng kí tham gia", {
        variant: "info",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      return;
    }
    try {
      const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/make-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: getToken() },
        // delete fetching field before send, cause backend does not need it
        body: JSON.stringify({ profile: { ...state, fetching: undefined, imgSrc: profile.imgSrc }, privateKeyHex }),
      });

      const result = await response.json();
      // validate profile fail
      if (!response.ok) {
        enqueueSnackbar("Kiểm tra lại thông tin:" + JSON.stringify(result), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        // send to bkc fail
        if (!result.ok) {
          enqueueSnackbar("Tạo tx thất bại: " + JSON.stringify(result.msg), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          });
          dp(setProfile({ ...state, imgSrc: profile.imgSrc, state: "fail" }));
        } else {
          enqueueSnackbar("Đăng kí tham gia thành công, đang chờ kết quả bỏ phiếu!", {
            variant: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "center" },
          });
          dp(setProfile({ ...state, imgSrc: profile.imgSrc, state: "voting" }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // get public key to fill the form
  async function hdSelectAccountFromWallet() {
    // but for now, just deriver from privatkey
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    setState({ ...state, pubkey: PrivateKey.fromHex(privateKeyHex).publicKey.toHex(true) });
  }

  return (
    <Box className={cls.root}>
      <Paper className={cls.head}>
        <Typography variant="h3">Thông tin Trường học</Typography>
        <Typography variant="subtitle1">Thông tin này sẽ được hiển thị với BGD và các Trường khác</Typography>
      </Paper>
      <Box className={cls.body}>
        <Paper>
          <Box className={cls.box}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Tên Trường"
                  value={state?.universityName}
                  onChange={(e) => setState({ ...state, universityName: e.target.value })}
                  disabled={disable}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Tên Tiếng Anh"
                  value={state?.nameInEnglish}
                  onChange={(e) => setState({ ...state, nameInEnglish: e.target.value })}
                  disabled={disable}
                ></TextField>
              </Grid>
            </Grid>

            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Địa chỉ"
              value={state?.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
              disabled={disable}
            ></TextField>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Email"
                  value={state?.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Số điện thoại"
                  value={state?.phone}
                  onChange={(e) => setState({ ...state, phone: e.target.value })}
                  disabled={disable}
                ></TextField>
              </Grid>
            </Grid>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Khóa công khai"
              value={state?.pubkey}
              onChange={(e) => setState({ ...state, pubkey: e.target.value })}
              disabled={disable}
              InputProps={{
                endAdornment: !disable && (
                  <InputAdornment position="end">
                    <IconButton onClick={hdSelectAccountFromWallet}>
                      <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Mô tả khác"
              multiline
              rows={4}
              value={state?.description}
              onChange={(e) => setState({ ...state, description: e.target.value })}
              disabled={disable}
            ></TextField>
            {!disable && (
              <Box textAlign="right">
                <Button color="primary" variant="contained" onClick={hdSubmit}>
                  Đăng kí tham gia
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
