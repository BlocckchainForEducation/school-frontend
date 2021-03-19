import { Box, Button, Grid, Step, StepLabel, Stepper, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { createRef, useState } from "react";
import { setToken } from "../../utils/mng-token";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../utils/snackbar-utils";

export default function TwoFactorStepper({ secret, qrDataURL, setOpenDialog }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);
  const [refs, setRefs] = useState([...Array(6).keys()].map(() => createRef()));

  const { enqueueSnackbar } = useSnackbar();

  function hdKeyUp(e, index) {
    const clonedOTP = [...OTP];
    if (e.keyCode === 8) {
      clonedOTP[index] = "";
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    } else {
      clonedOTP[index] = e.key;
      if (index < 5) {
        refs[index + 1].current.focus();
      }
    }
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
            {[...Array(6).keys()].map((item, index) => (
              <Grid item key={index}>
                <TextField
                  inputProps={{ size: 1 }}
                  variant="outlined"
                  color="primary"
                  value={OTP[index]}
                  // onChange={(e) => hdChange(e, index)}
                  onKeyUp={(e) => hdKeyUp(e, index)}
                  inputRef={refs[index]}
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
