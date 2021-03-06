import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import SimpleTable from "../../../shared/Table/SimpleTable";
import { setPreloadHistory } from "./redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import XLSX from "xlsx";

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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/student-history`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load history: " + JSON.stringify(result), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      dp(setPreloadHistory(result));
    }
  }
  async function hdDownloadClick(e, item) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(item.profiles);
    XLSX.utils.book_append_sheet(wb, ws, "Sinh viên - " + item.time);
    XLSX.writeFile(wb, "sinh-viên" + item.time + ".xlsx");
  }

  const head = ["Mssv", "Họ và tên", "Ngày sinh", "Lớp", "Email", "Password"];
  const title = "Lịch sử upload sinh viên";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [
          profile.studentId,
          profile.name,
          profile.birthday,
          profile.class,
          // profile.publicKey,
          // profile.privateKey,
          profile.email,
          profile.firstTimePassword,
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
            <AccordionActions>
              <Button startIcon={<GetAppIcon />} variant="outlined" color="primary" onClick={(e) => hdDownloadClick(e, item)}>
                Download
              </Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </Box>
  );
  return fetching ? null : content;
}
