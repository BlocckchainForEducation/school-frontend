import { useEffect } from "react";
import { Accordion, makeStyles, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { setPreloadHistory } from "./redux";
import { useSnackbar } from "notistack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimpleTable from "../../../shared/Table/SimpleTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TeacherUploadHistory() {
  const cls = useStyles();
  const fetching = useSelector((state) => state.teacherSlice.fetching);
  const history = useSelector((state) => state.teacherSlice.history);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/teacher-history`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load history: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(setPreloadHistory(result));
    }
  }

  const head = ["Mã giảng viên", "Họ và tên", "Viện", "Account", "Password", "Txid"];
  const title = "Lịch sử upload Giảng viên";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [
          profile.teacherId,
          profile.name,
          profile.department,
          profile.email,
          profile.firstTimePassword,
          profile.txid ?? <CircularProgress size="1rem"></CircularProgress>,
        ]);
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
