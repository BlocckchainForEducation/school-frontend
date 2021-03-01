import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Page from "../../../shared/Page";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getLinkFromTxid } from "src/utils/utils";

export default function RevokeCertificate() {
  const [studentId, setStudentId] = useState("");
  const [cert, setCert] = useState(); // just the newest cert

  const { enqueueSnackbar } = useSnackbar();

  async function hdSubmitStudentId() {
    try {
      const response = await axios.get(`/staff/certificate?studentId=${studentId}`);
      console.log(response);
      if (response.data.found === false) {
        enqueueSnackbar("Không tìm thấy bằng cấp nào của: " + studentId, {
          variant: "info",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        setCert(response.data);
      }
    } catch (error) {
      enqueueSnackbar("Fail to load certificate: " + error.response.data, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
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
      {cert === null && "Khong tim thay bang cap nao"}
      {cert && <CertTable cert={cert}></CertTable>}
    </Page>
  );
}

function CertTable({ cert }) {
  const [certPart1, certPart2] = separateCertificate(cert);
  return (
    <Paper>
      <Box p={2} pb={1} display="flex" justifyContent="flex-start" alignItems="center">
        <Typography variant="h4">Thông tin bằng cấp</Typography>
        {cert.active && (
          <Tooltip title="Bằng cấp hợp lệ, sẵn sàng để chia sẻ">
            <CheckIcon color="primary" size="1rem"></CheckIcon>
          </Tooltip>
        )}
        {!cert.active && (
          <Tooltip title="Bằng cấp đã bị thu hồi!">
            <ErrorOutlineIcon color="secondary" size="1rem"></ErrorOutlineIcon>
          </Tooltip>
        )}
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item sm={12} md={6}>
          <SimpleTable rows={certPart1}></SimpleTable>
        </Grid>
        <Grid item sm={12} md={6}>
          <SimpleTable rows={certPart2}></SimpleTable>
        </Grid>
      </Grid>
    </Paper>
  );
}

function SimpleTable({ rows }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {Object.entries(rows).map((entry, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "50%" }}>{entry[0]}</TableCell>
              <TableCell>{entry[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function separateCertificate(cert) {
  const link = getLinkFromTxid(cert.txid);
  let certPart1 = {
    "Họ và tên": cert.name,
    "Ngày sinh": cert.birthday,
    "Giới tính": cert.gender,
    Trường: cert.university,
    "Ngành học": cert.faculty,
    "Loại bằng": cert.degree,
    "Năm tốt nghiệp": cert.gradyear,
  };
  let certPart2 = {
    "Xếp loại": cert.level,
    "Hình thức đào tạo": cert.eduform,
    "Nơi cấp": cert.issuelocation,
    "Ngày cấp": cert.issuedate,
    "Hiệu trưởng": cert.headmaster,
    // "Số hiệu": cert.regisno,
    "Số hiệu vào sổ": cert.globalregisno,
    Txid: link,
  };
  return [certPart1, certPart2];
}
