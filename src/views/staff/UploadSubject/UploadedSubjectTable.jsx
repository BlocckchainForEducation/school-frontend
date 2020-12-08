import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { setPreloadSubjects } from "./redux";

const columns = [
  { field: "id", headerName: "#", type: "string" },
  { field: "subjectId", headerName: "Mã môn học", width: 125, type: "string" },
  { field: "name", headerName: "Tên môn học", width: 200, type: "string" },
  { field: "semester", headerName: "Kì học", type: "number" },
  { field: "credit", headerName: "Số tín chỉ", type: "number" },
  { field: "note", headerName: "Ghi chú", width: 200, type: "string" },
];

export default function UploadedSubjectTable(props) {
  const fetching = useSelector((state) => state.subjectSlice.fetching);
  const subjects = useSelector((state) => state.subjectSlice.subjects);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedSubject();
  }, []);

  async function fetchUploadedSubject() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/subjects`, {
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

  return <Paper style={{ minHeight: "380px", width: "100%" }}>{fetching ? null : <DataGrid rows={subjects} columns={columns} pageSize={5} />}</Paper>;
}
