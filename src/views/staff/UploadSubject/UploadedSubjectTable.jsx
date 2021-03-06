import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { setPreloadSubjects } from "./redux";
import { makeStyles } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "#", width: 50, type: "string" },
  { field: "subjectId", headerName: "Mã môn học", width: 125, type: "string" },
  { field: "name", headerName: "Tên môn học", width: 200, type: "string" },
  { field: "semester", headerName: "Kì học", type: "number" },
  { field: "credit", headerName: "Số tín chỉ", type: "number" },
  { field: "note", headerName: "Ghi chú", width: 200, type: "string" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}));

export default function UploadedSubjectTable(props) {
  const cls = useStyles();
  const fetching = useSelector((state) => state.subjectSlice.fetching);
  const subjects = useSelector((state) => state.subjectSlice.subjects);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedSubject();
  }, []);

  async function fetchUploadedSubject() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/subjects`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load uploaded subjects!: " + JSON.stringify(result), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      dp(setPreloadSubjects(result));
    }
  }

  return (
    <Paper style={{ height: "350px", width: "100%" }}>
      <DataGrid
        className={cls.root}
        loading={fetching}
        rows={subjects}
        columns={columns}
        rowHeight={48}
        autoPageSize
        // pageSize={5}
        // autoHeight
        // rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Paper>
  );
}
