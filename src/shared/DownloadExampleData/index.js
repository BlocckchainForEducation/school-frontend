import { Box, Button, Collapse, Divider, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import SimpleTable from "../Table/SimpleTable";
import FileSaver from "file-saver";
import { useState } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DownloadExampleData({ title, fileName, head, body, minWidth }) {
  const cls = useStyles();
  const [show, setShow] = useState(false);

  function hdClickDownload(e) {
    FileSaver.saveAs(`/static/excels/${fileName}`, fileName);
  }

  function toggleCollapse() {
    setShow(!show);
  }

  return (
    <Paper>
      <Box pl={2} pr={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{title || "Mẫu dữ liệu"}</Typography>
        <Box>
          {/* <Button variant="outlined" color="primary" className={cls.button} startIcon={<GetAppIcon />} onClick={hdClickDownload}></Button> */}
          <IconButton onClick={hdClickDownload}>
            <GetAppIcon />
          </IconButton>
          {show ? (
            <IconButton onClick={toggleCollapse}>
              <KeyboardArrowUpIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleCollapse}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider></Divider>
      <Collapse in={show}>
        <SimpleTable head={head} body={body} minWidth={minWidth}></SimpleTable>
      </Collapse>
    </Paper>
  );
}
