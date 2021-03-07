import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getLinkFromTxid } from "../../../utils/utils";
import { setPreloadClasses } from "./redux";

const columns = [
  { field: "id", headerName: "#", width: 50, type: "string" },
  { field: "semester", headerName: "Kì học", width: 100, type: "string" },
  { field: "classId", headerName: "Mã lớp học", width: 120, type: "string" },
  { field: "subjectId", headerName: "Mã môn học", width: 120, type: "string" },
  { field: "subjectName", headerName: "Tên môn học", width: 250, type: "string" },
  // { field: "teacherId", headerName: "Mã GV", width: 125, type: "string" },
  { field: "teacherName", headerName: "GV", width: 200, type: "string" },
  // { field: "bureauId", headerName: "Mã GVU", width: 125, type: "string" },
  { field: "bureauName", headerName: "GVU", width: 200, type: "string" },
  // { field: "studentIds", headerName: "DSSV", width: 400, type: "string" },
  // { field: "txid", headerName: "Txid", width: 1200, type: "string" },
  // { field: "link", headerName: "Txid", width: 1200, type: "string" },
];

export default function UploadedClassTable(props) {
  const fetching = useSelector((state) => state.classSlice.fetching);
  const classes = useSelector((state) => state.classSlice.classes);
  const classesWithLink = classes.map((clx) => ({
    ...clx,
    link: getLinkFromTxid(clx.txid),
  }));
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedClass();
  }, []);

  async function fetchUploadedClass() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/classes`, {
      headers: { Authorization: getToken() },
    });
    if (!response.ok) {
      enqueueSnackbar(`${response.status}: ${await response.text()}`, ERR_TOP_CENTER);
    } else {
      const result = await response.json();
      dp(setPreloadClasses(result));
    }
  }

  return (
    classes.length !== 0 && (
      <Paper style={{ height: "350px", width: "100%" }}>
        {fetching ? null : <DataGrid rows={classesWithLink} columns={columns} autoPageSize rowHeight={48} />}
      </Paper>
    )
  );
}
