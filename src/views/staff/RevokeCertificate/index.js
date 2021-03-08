import { Box, Button, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER, INFO_TOP_CENTER } from "../../../utils/snackbar-utils";
import SearchResult from "./SearchResult";

export default function RevokeCertificate() {
  const [studentId, setStudentId] = useState("");
  const [certs, setCerts] = useState();
  const { enqueueSnackbar } = useSnackbar();

  async function hdSubmitStudentId() {
    try {
      const response = await axios.get(`/staff/certificate?studentId=${studentId}`);
      if (response.data.length === 0) {
        enqueueSnackbar("Không tìm thấy bằng cấp nào của: " + studentId, INFO_TOP_CENTER);
        setCerts(null);
      } else {
        setCerts(response.data);
      }
    } catch (error) {
      enqueueSnackbar("Fail to load certificate: " + error.response.data, ERR_TOP_CENTER);
    }
  }

  return (
    <Page title="Thu hồi bằng cấp">
      <Paper>
        <Box px={2} py={2} display="flex" alignItems="flex-end">
          <TextField
            label="Mã số sinh viên"
            InputLabelProps={{ shrink: true }}
            autoFocus
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          ></TextField>
          <Box px={2}>
            <Button variant="contained" color="primary" onClick={hdSubmitStudentId}>
              Go
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box mt={3}>{certs && <SearchResult certs={certs}></SearchResult>}</Box>
    </Page>
  );
}
