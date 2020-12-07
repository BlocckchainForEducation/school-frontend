import { Accordion, AccordionDetails, AccordionSummary, Box, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import SimpleTable from "../../../shared/Table/SimpleTable";
import { setPreloadHistory } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SubjectUploadHistory() {
  const cls = useStyles();
  const fetching = useSelector((state) => state.subjectSlice.fetching);
  const history = useSelector((state) => state.subjectSlice.history);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/subject-history`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load history: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(setPreloadHistory(result));
    }
  }

  const head = ["Mã môn học", "Tên môn học", "Kì học", "Số tín chỉ", "Ghi chú"];
  const title = "Lịch sử upload môn học";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [profile.subjectId, profile.name, profile.semester, profile.credit, profile.note]);
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item._id}>
              <Typography className={cls.heading}>{`#${index + 1}, ${item.time}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SimpleTable head={head} body={body}></SimpleTable>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
  return fetching ? null : content;
}
