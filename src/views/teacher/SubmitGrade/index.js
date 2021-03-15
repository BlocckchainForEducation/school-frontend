import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@material-ui/lab";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_RIGHT, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { getLinkFromTxid } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    "& .MuiTimelineItem-missingOppositeContent:before": {
      flex: 0,
      padding: 0,
    },
    "& .MuiInputBase-input": {
      paddingLeft: "20px",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black",
    },
  },
}));

export default function SubmitGrade(props) {
  const cls = useStyles();
  const [fetching, setFetching] = useState(true);
  const [classes, setClasses] = useState([]);

  const groupedClassesBySemester =
    classes.length === 0
      ? null
      : classes.reduce((accumulator, claxx) => {
          accumulator[claxx.semester] = [...(accumulator[claxx.semester] || []), claxx];
          return accumulator;
        }, {});

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchMyClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMyClasses() {
    try {
      const response = await axios.get("/teacher/my-classes");
      setClasses(response.data);
      setFetching(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  function hdChangeHalfSemester(classId, studentIndex, e) {
    const cloneClasses = [...classes];
    const claxx = cloneClasses.find((clx) => clx.classId === classId);
    if (!claxx.students[studentIndex].versions) {
      claxx.students[studentIndex].versions = [{ halfSemesterPoint: e.target.value }];
    } else {
      claxx.students[studentIndex].versions[0].halfSemesterPoint = e.target.value;
    }
    setClasses(cloneClasses);
  }

  function hdChangeFinalSemester(classId, studentIndex, e) {
    const cloneClasses = [...classes];
    const claxx = cloneClasses.find((clx) => clx.classId === classId);
    if (!claxx.students[studentIndex].versions) {
      claxx.students[studentIndex].versions = [{ finalSemesterPoint: e.target.value }];
    } else {
      claxx.students[studentIndex].versions[0].finalSemesterPoint = e.target.value;
    }
    setClasses(cloneClasses);
  }

  async function hdSaveDraff(classId) {
    const claxx = classes.find((clx) => clx.classId === classId);
    try {
      const response = await axios.post("/teacher/save-draff", { claxx });
      enqueueSnackbar("Lưu nháp thành công", SUCCESS_BOTTOM_RIGHT);
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }
  async function hdSubmitGrade(classId) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    const claxx = classes.find((clx) => clx.classId === classId);
    try {
      const response = await axios.post("/teacher/submit-grade", { privateKeyHex, claxx });
      {
        const cloneClasses = [...classes];
        // remove old claxx, add new claxx (has txid, isSubmited...)
        const filterdClasses = cloneClasses.filter((clx) => clx.classId !== classId);
        filterdClasses.push(response.data);
        setClasses(filterdClasses);
      }
      enqueueSnackbar("Gửi điểm thành công", SUCCESS_TOP_CENTER);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  const content = !groupedClassesBySemester ? (
    "Không tìm thấy lớp học nào!"
  ) : (
    <Timeline className={cls.root}>
      {Object.entries(groupedClassesBySemester).map((entry, index) => {
        return (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index !== Object.entries(groupedClassesBySemester).length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box>
                {/* semester */}
                <Typography gutterBottom variant="h5">{`Kì ${entry[0]}`}</Typography>

                {/* class list */}
                <Box px={1}>
                  {entry[1].map((claxx) => {
                    const disable = claxx.isSubmited;
                    return (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          {`Lớp: ${claxx.classId} - ${claxx.subject.subjectId} - ${claxx.subject.subjectName}`}
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>#</TableCell>
                                  <TableCell>MSSV</TableCell>
                                  <TableCell>Họ và tên</TableCell>
                                  <TableCell>Ngày sinh</TableCell>
                                  <TableCell>Email</TableCell>
                                  <TableCell style={{ width: "100px" }}>Điểm GK</TableCell>
                                  <TableCell style={{ width: "100px" }}>Điểm CK</TableCell>
                                  {disable && <TableCell>Txid</TableCell>}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {claxx.students.map((student, index) => {
                                  const halfPoint = claxx.students[index]?.versions?.[0].halfSemesterPoint;
                                  // const halfError = !Boolean(halfPoint <= 10 && halfPoint >= 0);
                                  const halfError = Boolean(halfPoint > 10 || halfPoint < 0);
                                  const finalPoint = claxx.students[index]?.versions?.[0].finalSemesterPoint;
                                  // const finalError = !Boolean(finalPoint <= 10 && finalPoint >= 0);
                                  const finalError = Boolean(finalPoint > 10 || finalPoint < 0);
                                  return (
                                    <TableRow key={index}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{student.studentId}</TableCell>
                                      <TableCell>{student.name}</TableCell>
                                      <TableCell>{student.birthday}</TableCell>
                                      <TableCell>{student.email}</TableCell>
                                      <TableCell>
                                        <TextField
                                          // type="number"
                                          value={halfPoint}
                                          onChange={(e) => hdChangeHalfSemester(claxx.classId, index, e)}
                                          error={halfError}
                                          helperText={halfError && "Từ 0 - 10"}
                                          disabled={disable}
                                        ></TextField>
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          // type="number"
                                          value={finalPoint}
                                          onChange={(e) => hdChangeFinalSemester(claxx.classId, index, e)}
                                          error={finalError}
                                          helperText={finalError && "Từ 0 - 10"}
                                          disabled={disable}
                                        ></TextField>
                                      </TableCell>
                                      {disable && <TableCell>{getLinkFromTxid(student.versions[0].txid, 15)} </TableCell>}
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                        <AccordionActions>
                          <Button
                            startIcon={<SaveIcon></SaveIcon>}
                            variant="contained"
                            // style={{ backgroundColor: "#4caf50", color: "white" }}
                            onClick={(e) => hdSaveDraff(claxx.classId)}
                            disabled={disable}
                          >
                            Lưu nháp
                          </Button>
                          <Button
                            startIcon={<SendIcon></SendIcon>}
                            variant="contained"
                            color="primary"
                            onClick={(e) => hdSubmitGrade(claxx.classId)}
                            disabled={disable}
                          >
                            Gửi điểm
                          </Button>
                        </AccordionActions>
                      </Accordion>
                    );
                  })}
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  return <Page title="Nhập điểm lớp học">{fetching ? null : content}</Page>;
}
