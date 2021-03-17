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
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getLinkFromTxid } from "../../../utils/utils";

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
  const { student, index } = props;
  const [open, setOpen] = useState(false);
  const cls = useRowStyles();

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
            <Box px={2} pt={2}>
              <EditGradeForm hdSubmit={(halfSemesterPoint, finalSemesterPoint) => {}}></EditGradeForm>
              <Box mt={3}></Box>

              <Timeline className={cls.timeline}>
                {student.versions.map((version, versionIndex) => {
                  return (
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary"></TimelineDot>
                        {versionIndex !== student.versions.length - 1 && <TimelineConnector></TimelineConnector>}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>
                          {`v${versionIndex + 1}`}, {`GK: ${version.halfSemesterPoint}`}, {`CK: ${version.finalSemesterPoint}`}, Txid:{" "}
                          {getLinkFromTxid(version.txid, 20)}
                        </Typography>
                        {/* <Grid container>
                          <Grid item xs={3}>{`Version: ${versionIndex + 1}`}</Grid>
                          <Grid item xs={3}>{`GK: ${version.halfSemesterPoint}`}</Grid>
                          <Grid item xs={3}>{`CK: ${version.finalSemesterPoint}`}</Grid>
                          <Grid item xs={3}>
                            Txid: {getLinkFromTxid(version.txid, 12)}
                          </Grid>
                        </Grid> */}
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
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
      <Grid item>
        <Typography variant="h4">Nhập điểm mới:</Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm GK"
          value={halfSemesterPoint}
          onChange={(e) => setHalfSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm CK"
          value={finalSemesterPoint}
          onChange={(e) => setFinalSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={(e) => hdSubmit(halfSemesterPoint, finalSemesterPoint)}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default function EditGrade(props) {
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
                    return <RowWithCollapseContent key={index} student={student} index={index}></RowWithCollapseContent>;
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
