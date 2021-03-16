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
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@material-ui/lab";

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
            <Box>
              <Grid container>
                <Grid></Grid>
                <Grid></Grid>
                <Grid></Grid>
              </Grid>
              <Timeline className={cls.timeline}>
                {student.versions.map((version, versionIndex) => {
                  return (
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary"></TimelineDot>
                        {versionIndex !== student.versions.length - 1 && <TimelineConnector></TimelineConnector>}
                      </TimelineSeparator>
                      <TimelineContent>{`v${versionIndex + 1}, GK: ${version.halfSemesterPoint}, CK: ${
                        version.finalSemesterPoint
                      }, Txid: ${version.txid.slice(0, 15)}`}</TimelineContent>
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
          <Box p={2}>
            <TableContainer>
              <Table size="small">
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
