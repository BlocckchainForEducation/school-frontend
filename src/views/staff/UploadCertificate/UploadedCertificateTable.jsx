import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../utils/mng-token";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { setPreloadCertificates } from "./redux";

const columns = [
  { field: "id", headerName: "#", width: 50, type: "string" },
  { field: "studentId", headerName: "Mã số sv", width: 125, type: "string" },
  { field: "name", headerName: "Họ và tên", width: 200, type: "string" },
  { field: "birthday", headerName: "Ngày sinh", width: 150, type: "string" },
  { field: "gender", headerName: "Giới tính", type: "string" },
  { field: "university", headerName: "Trường", width: 250, type: "string" },
  { field: "faculty", headerName: "Ngành học", width: 200, type: "string" },
  { field: "degree", headerName: "Loại bằng", width: 125, type: "string" },
  {
    field: "gradyear",
    headerName: "Năm tốt nghiệp",
    width: 125,
    type: "string",
  },
  { field: "level", headerName: "Xếp loại", width: 125, type: "string" },
  {
    field: "eduform",
    headerName: "Hình thức đào tạo",
    width: 200,
    type: "string",
  },
  { field: "issuelocation", headerName: "Nơi cấp", width: 125, type: "string" },
  { field: "issuedate", headerName: "Ngày cấp", width: 200, type: "string" },
  {
    field: "headmaster",
    headerName: "Hiệu trưởng",
    width: 200,
    type: "string",
  },
  { field: "regisno", headerName: "Số hiệu", width: 200, type: "string" },
  {
    field: "globalregisno",
    headerName: "Số hiệu vào sổ",
    width: 200,
    type: "string",
  },
  { field: "txid", headerName: "Txid", width: 1200, type: "string" },
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/certificates`, {
      headers: { Authorization: getToken() },
    });
    if (!response.ok) {
      enqueueSnackbar(`${response.status}: ${await response.text()}`, ERR_TOP_CENTER);
    } else {
      const result = await response.json();
      dp(setPreloadCertificates(result));
    }
  }

  return (
    certificates.length !== 0 && (
      <Paper style={{ height: "350px", width: "100%" }}>
        {fetching ? null : <DataGrid rows={certificates} columns={columns} autoPageSize rowHeight={48} loading={fetching} />}
      </Paper>
    )
  );
}
