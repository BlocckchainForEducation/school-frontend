import {
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@material-ui/lab";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Page from "../../../shared/Page";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getLinkFromTxid, toDateTimeString } from "../../../utils/utils";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  timeline: {
    paddingLeft: 0,
    "& .MuiTimelineItem-missingOppositeContent:before": {
      flex: 0,
      padding: 0,
    },
  },
});

function RowWithCollapseContent(props) {
  const { claxx, student, index } = props;
  const [open, setOpen] = useState(false);
  const cls = useRowStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <TableRow className={cls.root}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{student.studentId}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.birthday}</TableCell>
        <TableCell>{student.email}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box p={2}>
              <Typography variant="h4">Lịch sử điểm</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Điểm GK</TableCell>
                      <TableCell>Điểm CK</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Txid</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {student.versions.map((version, vIndex) => {
                      return (
                        <TableRow>
                          <TableCell>{vIndex + 1}</TableCell>
                          <TableCell>{version.halfSemesterPoint}</TableCell>
                          <TableCell>{version.finalSemesterPoint}</TableCell>
                          <TableCell>{toDateTimeString(version.timestamp)}</TableCell>
                          <TableCell>{getLinkFromTxid(version.txid, 20)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={4}></Box>
              <EditGradeForm
                hdSubmit={async (halfSemesterPoint, finalSemesterPoint) => {
                  const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
                  try {
                    const response = await axios.post("/teacher/edit-grade", {
                      privateKeyHex,
                      claxx,
                      student,
                      halfSemesterPoint,
                      finalSemesterPoint,
                    });
                    const clonedClass = { ...claxx };
                    const stdInClonedClass = clonedClass.students.find((std) => std.studentId === student.studentId);
                    stdInClonedClass.versions.push(response.data);
                  } catch (error) {
                    enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
                  }
                }}
              ></EditGradeForm>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function EditGradeForm({ hdSubmit }) {
  const [halfSemesterPoint, setHalfSemesterPoint] = useState();
  const [finalSemesterPoint, setFinalSemesterPoint] = useState();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={12} md={3}>
        <Typography variant="h4">Nhập điểm mới:</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm GK"
          value={halfSemesterPoint}
          onChange={(e) => setHalfSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm CK"
          value={finalSemesterPoint}
          onChange={(e) => setFinalSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={1}>
        <Button variant="contained" color="primary" onClick={(e) => hdSubmit(halfSemesterPoint, finalSemesterPoint)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default function EditGrade() {
  const [classId, setClassId] = useState("");
  const [claxx, setClaxx] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function hdGetClass() {
    try {
      const response = await axios.get("/teacher/classes/" + classId);
      setClaxx(response.data);
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <Page title="Sửa điểm">
      {/* input class id */}
      <Paper>
        <Box px={2} py={2} display="flex" alignItems="flex-end">
          <TextField label="Mã lớp" InputLabelProps={{ shrink: true }} autoFocus onChange={(e) => setClassId(e.target.value)}></TextField>
          <Box px={2}>
            <Button variant="contained" color="primary" onClick={hdGetClass}>
              Go
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* mt */}
      <Box mt={2}> </Box>

      {/* if not found */}
      {claxx === null && (
        <Paper>
          <Box p={2}>
            <Typography>{`Không tìm thấy lớp ${classId}`}</Typography>
          </Box>
        </Paper>
      )}

      {/* if found */}
      {claxx && (
        <Paper>
          <Box px={1} py={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>MSSV</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Ngày sinh</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claxx.students.map((student, index) => {
                    return <RowWithCollapseContent key={index} student={student} index={index} claxx={claxx}></RowWithCollapseContent>;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
    </Page>
  );
}
