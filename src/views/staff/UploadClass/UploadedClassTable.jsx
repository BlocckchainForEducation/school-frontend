import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { getLinkFromTxid } from "../../../utils/utils";
import { setPreloadClasses } from "./redux";

const columns = [
  { field: "id", headerName: "#", width: 75, type: "string" },
  { field: "semester", headerName: "Kì học", width: 100, type: "string" },
  { field: "subjectId", headerName: "Mã môn học", width: 125, type: "string" },
  { field: "classId", headerName: "Mã lớp học", width: 125, type: "string" },
  { field: "teacherId", headerName: "Mã GV", width: 125, type: "string" },
  { field: "bureauId", headerName: "Mã GVU", width: 125, type: "string" },
  { field: "studentIds", headerName: "DSSV", width: 400, type: "string" },
  { field: "txid", headerName: "Txid", width: 1200, type: "string" },
  // { field: "link", headerName: "Txid", width: 1200, type: "string" },
];

export default function UploadedClassTable(props) {
  const fetching = useSelector((state) => state.classSlice.fetching);
  const classes = useSelector((state) => state.classSlice.classes);
  const driverClasses = classes.map((clx) => ({
    ...clx,
    link: getLinkFromTxid(clx.txid),
  }));
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedClass();
  }, []);

  async function fetchUploadedClass() {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/staff/classes`,
      {
        headers: { Authorization: getToken() },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar(
        "Fail to load uploaded classes!: " + JSON.stringify(result),
        {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        }
      );
    } else {
      dp(setPreloadClasses(result));
    }
  }

  return (
    <Paper style={{ height: "350px", width: "100%" }}>
      {fetching ? null : (
        <DataGrid
          rows={driverClasses}
          columns={columns}
          autoPageSize
          rowHeight={48}
        />
      )}
    </Paper>
  );
}
