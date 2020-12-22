import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { setPreloadCertificates } from "./redux";

const columns = [
  { field: "id", headerName: "#", width: 50, type: "string" },
  { field: "name", headerName: "Họ và tên", width: 200, type: "string" },
  { field: "birthday", headerName: "Ngày sinh", width: 150, type: "string" },
  { field: "gender", headerName: "Giới tính", type: "string" },
  { field: "university", headerName: "Trường", width: 250, type: "string" },
  { field: "faculty", headerName: "Ngành học", width: 200, type: "string" },
  { field: "degree", headerName: "Loại bằng", width: 125, type: "string" },
  { field: "gradyear", headerName: "Năm tốt nghiệp", width: 125, type: "string" },
  { field: "level", headerName: "Xếp loại", width: 125, type: "string" },
  { field: "eduform", headerName: "Hình thức đào tạo", width: 200, type: "string" },
  { field: "issuelocation", headerName: "Nơi cấp", width: 125, type: "string" },
  { field: "issuedate", headerName: "Ngày cấp", width: 200, type: "string" },
  { field: "headmaster", headerName: "Hiệu trưởng", width: 200, type: "string" },
  { field: "regisno", headerName: "Số hiệu", width: 200, type: "string" },
  { field: "globalregisno", headerName: "Số hiệu vào sổ", width: 200, type: "string" },
];

export default function UploadedCertificateTable(props) {
  const fetching = useSelector((state) => state.certificateSlice.fetching);
  const certificates = useSelector((state) => state.certificateSlice.certificates);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedCertificate();
  }, []);

  async function fetchUploadedCertificate() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/certificates`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load uploaded certificates!: " + JSON.stringify(result), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      dp(setPreloadCertificates(result));
    }
  }

  return (
    <Paper style={{ height: "350px", width: "100%" }}>
      {fetching ? null : <DataGrid rows={certificates} columns={columns} autoPageSize rowHeight={48} loading={fetching} />}
    </Paper>
  );
}
