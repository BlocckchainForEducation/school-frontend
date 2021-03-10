import { Grid, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React from "react";
import { getLinkFromTxid } from "src/utils/utils";

export default function Body({ cert }) {
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
