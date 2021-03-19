import { Box, Button, FormControlLabel, Grid, Step, StepLabel, Stepper, Switch, TextField, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";
import QRCode from "qrcode";
import React, { useState } from "react";
import { getToken, setToken } from "../../utils/mng-token";
import { ERR_TOP_CENTER, INFO_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../utils/snackbar-utils";

export default function TwoFactorAuthenDialog({ setOpenDialog }) {
  const token = getToken();
  const jwtToken = token.split(" ")[1];
  const decodedToken = jwtDecode(jwtToken);
  const [isEnable, setEnable] = useState(decodedToken.twoFAVerified);

  const { enqueueSnackbar } = useSnackbar();
  const [openStepper, setOpenStepper] = useState(false);
  const [twoFASecret, setTwoFASecret] = useState(null);
  const [qrDataURL, setQRDataURL] = useState(null);

  async function hdToggle(e) {
    if (e.target.checked) {
      // try to registry
      try {
        const response = await axios.post("/acc/2fa/registry", {});
        try {
          const dataURL = await QRCode.toDataURL(response.data.otpauth_url);
          setQRDataURL(dataURL);
          setTwoFASecret(response.data);
          setOpenStepper(true);
          setEnable(true);
        } catch (error) {
          alert("genarate qrcode failure");
        }
      } catch (error) {
        enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
      }
    } else {
      try {
        const response = await axios.post("/acc/2fa/disable", {});
        if (response.data.ok) {
          setToken(response.data.token);
          enqueueSnackbar("Đã tắt xác thực 2 bước!", INFO_TOP_CENTER);
          setOpenDialog(false);
        }
      } catch (error) {
        enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
      }
    }
  }

  return (
    <Dialog
      open={true}
      maxWidth="sm"
      fullWidth
      onClose={() => {
        setOpenDialog(false);
      }}
    >
      <DialogTitle>
        <Typography variant="h4">Xác thực 2 bước</Typography>
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Switch checked={Boolean(isEnable)} onChange={hdToggle}></Switch>}
          label="Trạng thái"
          labelPlacement="start"
        ></FormControlLabel>
        {openStepper && <TwoFAVerifyStepper secret={twoFASecret} qrDataURL={qrDataURL} setOpenDialog={setOpenDialog}></TwoFAVerifyStepper>}
      </DialogContent>
    </Dialog>
  );
}

function TwoFAVerifyStepper({ secret, qrDataURL, setOpenDialog }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [OTP, setOTP] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  function hdChange(e, index) {
    const clonedOTP = [...OTP];
    clonedOTP[index] = e.target.value;
    setOTP(clonedOTP);
  }

  async function sendOTP() {
    const otpString = OTP.join("");
    try {
      const response = await axios.post("/acc/2fa/verify", { OTP: otpString });
      if (!response.data.ok) {
        enqueueSnackbar("Mã OTP không chính xác! Hãy thử lại!", ERR_TOP_CENTER);
      } else {
        const newJWToken = response.data.token;
        setToken(newJWToken);
        setOpenDialog(false);
        enqueueSnackbar("Bật cơ chế xác thực 2 bước thành công!", SUCCESS_TOP_CENTER);
      }
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <Box pb={1}>
      <Stepper activeStep={activeStep}>
        <Step key="showSecretToUser">
          <StepLabel>Nhập mã vào Authenticator</StepLabel>
        </Step>
        <Step>
          <StepLabel>Xác nhận lại</StepLabel>
        </Step>
      </Stepper>

      <Box>
        {activeStep === 0 && (
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="h5">Quét mã QR code</Typography>
              <img src={qrDataURL} alt="QRCode" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">Hoặc nhập mã này</Typography>
              <Typography>{secret.base32}</Typography>
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={2} justify="center">
            {[...Array(6).keys()].map((index) => (
              <Grid item>
                <TextField
                  inputProps={{ size: 1 }}
                  variant="outlined"
                  color="primary"
                  value={OTP[index]}
                  onChange={(e) => hdChange(e, index)}
                ></TextField>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box mt={3} textAlign="right">
        <Button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)} style={{ marginRight: 16 }}>
          Back
        </Button>
        {activeStep === 0 && (
          <Button variant="contained" color="primary" onClick={() => setActiveStep(activeStep + 1)}>
            Next
          </Button>
        )}
        {activeStep === 1 && (
          <Button variant="contained" color="primary" onClick={sendOTP}>
            Send
          </Button>
        )}
      </Box>
    </Box>
  );
}
