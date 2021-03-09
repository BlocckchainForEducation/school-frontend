import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { setPreloadCertDocuments } from "./redux";
import axios from "axios";

const columns = [
  { field: "id", headerName: "#", width: 75, type: "string" },
  { field: "studentId", headerName: "Mã số sv", width: 125, type: "string" },
  { field: "name", headerName: "Họ và tên", width: 200, type: "string" },
  { field: "birthday", headerName: "Ngày sinh", width: 150, type: "string" },
  { field: "gender", headerName: "Giới tính", width: 125, type: "string" },
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
  { field: "version", headerName: "Version", width: 125, type: "string" },
  { field: "type", headerName: "Trạng thái", width: 200, type: "string" },
  { field: "timestamp", headerName: "Timestamp", width: 200, type: "string" },
  { field: "txid", headerName: "Txid", width: 500, type: "string" },
];

export default function UploadedCertificateTable(props) {
  const fetching = useSelector((state) => state.certificateSlice.fetching);
  const docs = useSelector((state) => state.certificateSlice.docs);
  const newestVersionCertificates = docs
    .map((doc) => doc.versions[doc.versions.length - 1])
    .map((cert, index) => ({ ...cert, id: index + 1 }));

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUploadedCertDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUploadedCertDocuments() {
    try {
      const response = await axios.get("/staff/certificates");
      dp(setPreloadCertDocuments(response.data));
    } catch (error) {
      enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    newestVersionCertificates.length !== 0 && (
      <Paper style={{ height: "650px", width: "100%" }}>
        {fetching ? null : (
          <DataGrid
            rows={newestVersionCertificates}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowHeight={48}
            loading={fetching}
          />
        )}
      </Paper>
    )
  );
}
