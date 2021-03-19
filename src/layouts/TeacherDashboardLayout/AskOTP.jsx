import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { createRef, useState } from "react";

export default function AskOTP(props) {
  const [OTP, setOTP] = useState(["", "", "", "", "", ""]);
  const [refs, setRefs] = useState([...Array(6).keys()].map(() => createRef()));

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

  return (
    <Box>
      <Typography align="center" variant="h4">
        Nhập mã OTP:
      </Typography>
      <Box mb={2}></Box>
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
              autoFocus={index === 0}
            ></TextField>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
