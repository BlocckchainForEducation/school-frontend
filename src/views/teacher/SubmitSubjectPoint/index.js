import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import Page from "../../../shared/Page";

import { makeStyles } from "@material-ui/core";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function SubmitSubjectPoint(props) {
  const cls = useStyles();

  const [claxx, setClaxx] = useState({
    _id: "5fcefb82459e8641a4b777e9",
    semester: 20201,
    subjectId: "SSH1170",
    classId: 117123,
    teacherId: "Gv1234",
    studentIds: "20161234,20161230",
    timestamp: 1607400322382,
    id: "14015a4f31b",
    subject: { name: "Cơ sở dữ liệu" },
    teacher: {
      teacherId: "Gv1234",
      name: "Nguyễn Văn B",
      email: "nguyenvanb@soict.hust.edu.vn",
      department: "Viện CNTT&TT",
      publicKey: "A0X+4i2FyudeVsKB6NLv8uLoGTcfBGEczZucKNwJdSMF",
      firstTimePassword: "vRJ40PDc",
      hashedPassword: "$2a$10$2nIxwyTkQzDREXJpC9U3QuU54HyJjv0xR7R7WG27cFWCBHQpd3Zeq",
      uid: "5fce12161c331704108c8597",
    },
    students: [
      {
        studentId: "20161234",
        name: "Nguyễn Văn B",
        birthday: "20-10-2000",
        class: "CNTT1.02",
        publicKey: "894ef8b00522ada51ece554012016b8a150e81d27796224c155ee3ed0f86287a8a81a1f082ad067d97bc15150a2b3c260e2f7e75c81ba9eb80b478c57a602ed7",
        privateKey: "b7807ddbcf6378affaff24353a0ac14cc6e9cedb16dc4089e6fc19614da44b5e",
      },
      {
        studentId: "20161234",
        name: "Nguyễn Văn B",
        birthday: "20-10-2000",
        class: "CNTT1.02",
        publicKey: "894ef8b00522ada51ece554012016b8a150e81d27796224c155ee3ed0f86287a8a81a1f082ad067d97bc15150a2b3c260e2f7e75c81ba9eb80b478c57a602ed7",
        privateKey: "b7807ddbcf6378affaff24353a0ac14cc6e9cedb16dc4089e6fc19614da44b5e",
      },
      {
        studentId: "20161234",
        name: "Nguyễn Văn B",
        birthday: "20-10-2000",
        class: "CNTT1.02",
        publicKey: "894ef8b00522ada51ece554012016b8a150e81d27796224c155ee3ed0f86287a8a81a1f082ad067d97bc15150a2b3c260e2f7e75c81ba9eb80b478c57a602ed7",
        privateKey: "b7807ddbcf6378affaff24353a0ac14cc6e9cedb16dc4089e6fc19614da44b5e",
      },
      {
        studentId: "20161234",
        name: "Nguyễn Văn B",
        birthday: "20-10-2000",
        class: "CNTT1.02",
        publicKey: "894ef8b00522ada51ece554012016b8a150e81d27796224c155ee3ed0f86287a8a81a1f082ad067d97bc15150a2b3c260e2f7e75c81ba9eb80b478c57a602ed7",
        privateKey: "b7807ddbcf6378affaff24353a0ac14cc6e9cedb16dc4089e6fc19614da44b5e",
      },
      {
        studentId: "20161234",
        name: "Nguyễn Văn B",
        birthday: "20-10-2000",
        class: "CNTT1.02",
        publicKey: "894ef8b00522ada51ece554012016b8a150e81d27796224c155ee3ed0f86287a8a81a1f082ad067d97bc15150a2b3c260e2f7e75c81ba9eb80b478c57a602ed7",
        privateKey: "b7807ddbcf6378affaff24353a0ac14cc6e9cedb16dc4089e6fc19614da44b5e",
      },
    ],
  });

  async function hdFetchClass(e) {}

  function hdChangeHalfSemester(index, e) {
    const newClaxx = { ...claxx };
    newClaxx.students[index].halfSemesterPoint = e.target.value;
    setClaxx(newClaxx);
  }
  function hdChangeFinalSemester(index, e) {
    const newClaxx = { ...claxx };
    newClaxx.students[index].finalSemesterPoint = e.target.value;
    setClaxx(newClaxx);
  }

  async function hdSubmit(e) {
    // TODO: validate whether missing input
  }

  return (
    <Page title="Nhập điểm lớp học">
      <Box className={cls.root}>
        <Paper>
          <Box px={2} py={2} display="flex" alignItems="flex-end">
            <TextField label="Mã lớp" InputLabelProps={{ shrink: true }} autoFocus></TextField>
            <Box px={2}>
              <Button variant="contained" color="primary" onClick={hdFetchClass}>
                Go
              </Button>
            </Box>
          </Box>
        </Paper>
        <Paper>
          <Box p={2}>
            <Typography variant="h5" gutterBottom>{`Nhập điểm môn ${claxx.subject.name} - Mã lớp ${claxx.classId} - Kì ${claxx.semester}`}</Typography>
            <Divider></Divider>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Mssv</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Ngày sinh</TableCell>
                    <TableCell>Lớp</TableCell>
                    <TableCell style={{ width: "100px" }}>Điểm GK</TableCell>
                    <TableCell style={{ width: "100px" }}>Điểm CK</TableCell>
                    {/* TODO: should we caculate it? or teacher must input it? */}
                    {/* <TableCell>Điểm bằng chữ</TableCell>
                <TableCell>Điểm hệ 4</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claxx.students.map((student, index) => {
                    const halfPoint = claxx.students[index].halfSemesterPoint;
                    // const halfError = !Boolean(halfPoint <= 10 && halfPoint >= 0);
                    const halfError = Boolean(halfPoint >= 10 || halfPoint <= 0);
                    const finalPoint = claxx.students[index].finalSemesterPoint;
                    // const finalError = !Boolean(finalPoint <= 10 && finalPoint >= 0);
                    const finalError = Boolean(finalPoint >= 10 || finalPoint <= 0);
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.birthday}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <TextField
                            value={halfPoint}
                            onChange={(e) => hdChangeHalfSemester(index, e)}
                            error={halfError}
                            helperText={halfError && "Từ 0 - 10"}
                          ></TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={finalPoint}
                            onChange={(e) => hdChangeFinalSemester(index, e)}
                            error={finalError}
                            helperText={finalError && "Từ 0 - 10"}
                          ></TextField>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} textAlign="right">
              <Button variant="contained" color="primary" onClick={hdSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Page>
  );
}
