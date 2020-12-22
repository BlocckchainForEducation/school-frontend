import { Box, Button, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import SimpleTable from "../Table/SimpleTable";
import FileSaver from "file-saver";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DownloadExampleData({ title, fileName, head, body }) {
  const cls = useStyles();

  function hdClickDownload(e) {
    FileSaver.saveAs(`/static/excels/${fileName}`, fileName);
  }

  return (
    <Paper>
      <Box px={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{title || "Mẫu dữ liệu"}</Typography>
        <Button variant="outlined" color="primary" className={cls.button} startIcon={<GetAppIcon />} onClick={hdClickDownload}>
          Download
        </Button>
      </Box>
      <Divider></Divider>
      <Box>
        <SimpleTable head={head} body={body}></SimpleTable>
      </Box>
    </Paper>
  );
}
