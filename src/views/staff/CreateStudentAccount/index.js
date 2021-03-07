import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragnDropZone from "../../../shared/DragnDropZone";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import StudentDataExample from "./StudentDataExample";
import StudentUploadHistory from "./StudentUploadHistory";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
    paddingBottom: theme.spacing(2.5),
  },
}));

export default function CreateStudentAccount() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.studentSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/create-student`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    if (!response.ok) {
      dp(uploadFileFail());
      enqueueSnackbar("Something went wrong: " + (await response.text()), ERR_TOP_CENTER);
    } else {
      const result = await response.json();
      dp(uploadFileSuccess(result));
      enqueueSnackbar("Upload file thành công!", SUCCESS_BOTTOM_CENTER);
    }
  }

  return (
    <Page title="Tạo tài khoản sinh viên">
      <div className={cls.root}>
        <StudentDataExample></StudentDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <StudentUploadHistory></StudentUploadHistory>
      </div>
    </Page>
  );
}
