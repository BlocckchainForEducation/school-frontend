import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLinkFromTxid } from "src/utils/utils";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import { setCertificates } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  typo: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function SearchResult() {
  const certs = useSelector((state) => state.revokeCertificateSlice.certificates);
  return (
    certs.length > 0 && (
      <Paper>
        {/* for now, just show the newest; in the future, may show history of list certificates */}
        <Title cert={certs[0]}></Title>
        <Divider></Divider>
        <CertificateInfo cert={certs[0]}></CertificateInfo>
      </Paper>
    )
  );
}

function Title({ cert }) {
  const cls = useStyles();
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdRevoke(cert) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    try {
      const response = await axios.post("/staff/revoke-certificate", { privateKeyHex, cert });
      enqueueSnackbar("Thu hồi bằng cấp thành công!", SUCCESS_TOP_CENTER);
      dp(setCertificates([response.data]));
    } catch (error) {
      enqueueSnackbar(error.response.data, ERR_TOP_CENTER);
    }
  }

  async function hdReactive(cert) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    try {
      const response = await axios.post("/staff/reactive-certificate", { privateKeyHex, cert });
      enqueueSnackbar("Cấp lại bằng cấp thành công!", SUCCESS_TOP_CENTER);
      dp(setCertificates([response.data]));
    } catch (error) {
      enqueueSnackbar(error.response.data, ERR_TOP_CENTER);
    }
  }

  return (
    <Box px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
      {cert.type === "revoke" ? (
        <>
          <Typography variant="h4" className={cls.typo}>
            Trạng thái bằng cấp: &nbsp; <ErrorOutlineIcon color="secondary"></ErrorOutlineIcon>
          </Typography>
          <Typography variant="h4" className={cls.typo}>
            {`Version: ${cert.version}`}
          </Typography>
          <Typography variant="h4" className={cls.typo}>
            {`Timestamp: ${cert.timestamp}`}
          </Typography>
          <Button color="primary" variant="outlined" onClick={(e) => hdReactive(cert)}>
            Cấp lại
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" className={cls.typo}>
            Trạng thái bằng cấp: &nbsp; <CheckIcon style={{ color: "green" }}></CheckIcon>
          </Typography>
          <Typography variant="h4" className={cls.typo}>
            {`Version: ${cert.version}`}
          </Typography>
          <Typography variant="h4" className={cls.typo}>
            {`Timestamp: ${cert.timestamp}`}
          </Typography>
          <Button color="primary" variant="outlined" onClick={(e) => hdRevoke(cert)}>
            Thu hồi
          </Button>
        </>
      )}
    </Box>
  );
}

function CertificateInfo({ cert }) {
  const [certPart1, certPart2] = separateCertificate(cert);

  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        <SimpleTable rows={certPart1}></SimpleTable>
      </Grid>
      <Grid item sm={12} md={6}>
        <SimpleTable rows={certPart2}></SimpleTable>
      </Grid>
    </Grid>
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
