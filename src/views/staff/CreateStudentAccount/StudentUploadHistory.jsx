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

export default function StudentUploadHistory() {
  const cls = useStyles();
  const fetching = useSelector((state) => state.studentSlice.fetching);
  const history = useSelector((state) => state.studentSlice.history);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/student-history`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load history: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(setPreloadHistory(result));
    }
  }

  const head = ["Mssv", "Họ và tên", "Ngày sinh", "Lớp", "Public key", "Private key"];
  const title = "Lịch sử upload sinh viên";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [
          profile.studentId,
          profile.name,
          profile.birthday,
          profile.class,
          profile.publicKey,
          profile.privateKey,
          // profile.txid ?? <CircularProgress size="1rem"></CircularProgress>,
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
