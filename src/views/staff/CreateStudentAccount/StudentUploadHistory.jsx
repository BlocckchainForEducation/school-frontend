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
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import axios from "axios";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchHistory() {
    try {
      const response = await axios.get("/staff/student-history");
      dp(setPreloadHistory(response.data));
    } catch (error) {
      enqueueSnackbar(error.response.data, ERR_TOP_CENTER);
    }
  }

  async function hdDownloadClick(e, item) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(item.profiles);
    XLSX.utils.book_append_sheet(wb, ws, "Sinh viên - " + item.time);
    XLSX.writeFile(wb, item.time + " - " + item.originalFileName);
  }

  const head = ["Mssv", "Họ và tên", "Ngày sinh", "Email", "Password"];
  // const title = "Lịch sử upload sinh viên";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [
          profile.studentId,
          profile.name,
          profile.birthday,
          profile.email,
          profile.firstTimePassword,
          // profile.txid ?? <CircularProgress size="1rem"></CircularProgress>,
        ]);
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item._id}>
              <Typography className={cls.heading}>{`#${index + 1}, ${item.time}, ${item.originalFileName}`}</Typography>
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
