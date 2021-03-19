import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useSnackbar } from "notistack";
import QRCode from "qrcode";
import React, { useState } from "react";
import { getToken, setToken } from "../../utils/mng-token";
import { ERR_TOP_CENTER, INFO_TOP_CENTER } from "../../utils/snackbar-utils";
import TwoFAStepper from "./TwoFAStepper";

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
        {openStepper && <TwoFAStepper secret={twoFASecret} qrDataURL={qrDataURL} setOpenDialog={setOpenDialog}></TwoFAStepper>}
      </DialogContent>
    </Dialog>
  );
}
