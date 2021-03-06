import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Page from "../../../shared/Page";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { getToken } from "../../../utils/mng-token";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function SubmitSubjectPoint(props) {
  const cls = useStyles();
  const [classId, setClassId] = useState("");
  const [claxx, setClaxx] = useState(null);
  const [submitState, setSubmitState] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function hdFetchClass(e) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/teacher/classes/${classId}`, {
        headers: { Authorization: getToken() },
      });
      const result = await response.json();
      if (!response.ok) {
        alert(JSON.stringify(await response.json()));
      } else {
        setClaxx(result);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

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
    // TODO: validate whether missing input point too
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    setSubmitState(true);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/teacher/submit-point`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: getToken() },
      body: JSON.stringify({ claxx, privateKeyHex }),
    });
    const result = await response.json();
    if (!response.ok) {
      setSubmitState("fail");
      enqueueSnackbar("Something went wrong: " + JSON.stringify(result), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      setSubmitState("success");
      // dp(uploadFileSuccess(result));
      enqueueSnackbar("Gửi dữ liệu thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <Page title="Nhập điểm lớp học">
      <Box className={cls.root}>
        <Paper>
          <Box px={2} py={2} display="flex" alignItems="flex-end">
            <TextField
              label="Mã lớp"
              InputLabelProps={{ shrink: true }}
              autoFocus
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            ></TextField>
            <Box px={2}>
              <Button variant="contained" color="primary" onClick={hdFetchClass}>
                Go
              </Button>
            </Box>
          </Box>
        </Paper>
        {claxx && (
          <Paper>
            <Box p={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h5"
                  gutterBottom
                >{`Nhập điểm môn ${claxx.subject.name} - Mã lớp ${claxx.classId} - Kì ${claxx.semester}`}</Typography>
                <Box>
                  {submitState === true && <CircularProgress size="1rem" color="primary"></CircularProgress>}
                  {submitState === "success" && <CheckIcon color="primary" fontSize="small"></CheckIcon>}
                  {submitState === "fail" && <CloseIcon color="secondary" fontSize="small"></CloseIcon>}
                </Box>
              </Box>
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
                      const halfError = Boolean(halfPoint > 10 || halfPoint < 0);
                      const finalPoint = claxx.students[index].finalSemesterPoint;
                      // const finalError = !Boolean(finalPoint <= 10 && finalPoint >= 0);
                      const finalError = Boolean(finalPoint > 10 || finalPoint < 0);
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
        )}
      </Box>
    </Page>
  );
}
