import { Box, Button, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import Page from "../../../shared/Page";

export default function RevokeCertificate() {
  const [studentId, setStudentId] = useState("");
  const [certs, setCerts] = useState(""); // each cert is one version

  async function hdSubmitStudentId() {}

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
    </Page>
  );
}
