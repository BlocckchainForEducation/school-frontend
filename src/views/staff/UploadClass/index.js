import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import DragnDropZone from "../../../shared/DragnDropZone";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";
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
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/upload-classes`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    if (!response.ok) {
      dp(uploadFileFail());
      enqueueSnackbar(response.status + ": " + (await response.text()), ERR_TOP_CENTER);
    } else {
      const result = await response.json();
      dp(uploadFileSuccess(result));
      enqueueSnackbar("Upload file thành công!", SUCCESS_BOTTOM_CENTER);
    }
  }

  return (
    <Page title="Upload lớp học">
      <div className={cls.root}>
        <ClassDataExample></ClassDataExample>

        {showAlert && (
          <Alert severity="info" variant="filled" onClose={() => setShowAlert(false)} style={{ fontSize: "1.25rem" }}>
            Lưu ý: Cần tạo Giảng viên và Sinh viên của lớp học tương ứng trước!
          </Alert>
        )}
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <UploadedClassTable></UploadedClassTable>
      </div>
    </Page>
  );
}
