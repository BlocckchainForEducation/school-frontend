import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import "date-fns";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { setProfile } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  const profile = useSelector((state) => state.schoolProfile);
  const [state, setState] = useState(profile);
  const [lastUpdatedState, setCheckPointState] = useState(state);
  const { enqueueSnackbar } = useSnackbar();
  const dp = useDispatch();

  async function hdSubmit(e) {
    try {
      e.preventDefault();
      if (lastUpdatedState === state) {
        enqueueSnackbar("Nothing changed", { variant: "info", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
        return;
      }

      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/make-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: getToken() },
        // delete fetching field before send data to backend to avoid fail validate, delete imgSrc to avoid request too large error.
        body: JSON.stringify({ ...state, fetching: undefined, imgSrc: undefined }),
      });

      if (!response.ok) {
        const error = await response.json();
        enqueueSnackbar("Something went wrong: " + JSON.stringify(error), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
      } else {
        setCheckPointState(state);
        dp(setProfile(state));
        enqueueSnackbar("Đăng kí tham gia thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }
    } catch (error) {
      alert(error);
    }
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
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Tên Tiếng Anh"
                  value={state?.nameInEnglish}
                  onChange={(e) => setState({ ...state, nameInEnglish: e.target.value })}
                ></TextField>
              </Grid>
            </Grid>

            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Địa chỉ"
              value={state?.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            ></TextField>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Email"
                  value={state?.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Số điện thoại"
                  value={state?.phone}
                  onChange={(e) => setState({ ...state, phone: e.target.value })}
                ></TextField>
              </Grid>
            </Grid>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Khóa công khai"
              value={state?.pubkey}
              onChange={(e) => setState({ ...state, pubkey: e.target.value })}
            ></TextField>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Mô tả khác"
              multiline
              rows={3}
              value={state?.description}
              onChange={(e) => setState({ ...state, description: e.target.value })}
            ></TextField>
            <Box textAlign="right">
              <Button color="primary" variant="contained" onClick={hdSubmit}>
                Đăng kí tham gia
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
