import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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
      marginBottom: theme.spacing(3),
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
        <Typography variant="h3">Thông tin trường học</Typography>
        <Typography variant="subtitle1">Thông tin này sẽ được hiển thị với BGD và các Trường khác</Typography>
      </Paper>
      <Box className={cls.body}>
        <Paper>
          <Box className={cls.box}>
            {/* row 1 */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="name"
                  label="Họ và tên"
                  fullWidth
                  // margin="normal"
                  value={state?.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    // margin="normal"
                    id="birthday"
                    label="Ngày sinh"
                    views={["year", "month", "date"]}
                    openTo="year"
                    disableFuture
                    autoOk
                    format="dd/MM/yyyy"
                    value={state?.birthDay}
                    onChange={(selectedDate) => setState({ ...state, birthDay: selectedDate })}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={4}>
                {/* <FormControl fullWidth margin="normal"> */}
                <FormControl fullWidth>
                  <InputLabel id="genderlabel" shrink>
                    Giới tính
                  </InputLabel>
                  <Select id="gender" labelId="genderlabel" value={state?.gender} onChange={(e) => setState({ ...state, gender: e.target.value })}>
                    <MenuItem value={1}>Nam</MenuItem>
                    <MenuItem value={2}>Nữ</MenuItem>
                    <MenuItem value={3}>Khác</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* row 2 */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  label="CMT/CCCD"
                  value={state?.cmt}
                  onChange={(e) => setState({ ...state, cmt: e.target.value })}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  label="Email"
                  value={state?.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  label="Số điện thoại"
                  value={state?.phone}
                  onChange={(e) => setState({ ...state, phone: e.target.value })}
                ></TextField>
              </Grid>
            </Grid>

            {/* row 3 */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  xs={12}
                  label="Quê quán"
                  value={state?.hometown}
                  onChange={(e) => setState({ ...state, hometown: e.target.value })}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  xs={12}
                  label="Nơi ở hiện tại"
                  value={state?.address}
                  onChange={(e) => setState({ ...state, address: e.target.value })}
                ></TextField>
              </Grid>
            </Grid>

            {/* row 4 */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  xs={12}
                  label="Mô tả bản thân"
                  multiline
                  rows={4}
                  value={state?.description}
                  onChange={(e) => setState({ ...state, description: e.target.value })}
                ></TextField>
              </Grid>
            </Grid>
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
