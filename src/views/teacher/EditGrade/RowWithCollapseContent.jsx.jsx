import { Box, Collapse, IconButton, makeStyles, TableCell, TableRow } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import EditGradeForm from "./EditGradeForm";
import EditGradeHistory from "./EditGradeHistory";

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

export default function RowWithCollapseContent(props) {
  const { claxx, student, index, setClaxx } = props;
  const [open, setOpen] = useState(false);
  const cls = useRowStyles();
  const { enqueueSnackbar } = useSnackbar();

  async function hdSubmit(halfSemesterPoint, finalSemesterPoint) {
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
      setClaxx(clonedClass);
    } catch (error) {
      console.error(error);
      if (error.response) enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

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
              <EditGradeHistory student={student}></EditGradeHistory>
              <Box mt={4}></Box>
              <EditGradeForm hdSubmit={hdSubmit}></EditGradeForm>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
