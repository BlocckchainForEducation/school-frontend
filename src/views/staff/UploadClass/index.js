import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import DragnDropZone from "../../../shared/DragnDropZone";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import ClassDataExample from "./ClassDataExample";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import UploadedClassTable from "./UploadedClassTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
    paddingBottom: theme.spacing(2.5),
    "& .MuiAlert-icon": {
      alignItems: "center",
    },
  },
}));

export default function Uploadclass() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.classSlice.uploading);
  const [showAlert, setShowAlert] = useState(true);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/v1.2/upload-classes`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      dp(uploadFileFail());
      enqueueSnackbar("Something went wrong: " + JSON.stringify(result), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      dp(uploadFileSuccess(result));
      enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <Page title="Upload lớp học">
      <div className={cls.root}>
        <ClassDataExample></ClassDataExample>

        {showAlert && (
          <Alert severity="info" variant="filled" onClose={() => setShowAlert(false)} style={{ fontSize: "1.25rem" }}>
            Lưu ý: Cần tạo Giáo vụ, Giảng viên và Sinh viên của lớp học tương ứng trước!
          </Alert>
        )}
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <UploadedClassTable></UploadedClassTable>
      </div>
    </Page>
  );
}
