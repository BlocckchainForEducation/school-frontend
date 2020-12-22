import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragnDropZone from "../../../shared/DragnDropZone";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import TeacherDataExample from "./TeacherDataExample";
import TeacherUploadHistory from "./TeacherUploadHistory";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import { requirePrivateKeyHex } from "../../../utils/keyholder";

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

export default function CreateTeacherAccount() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.teacherSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/create-teacher`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileFail());
        enqueueSnackbar("Something went wrong: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
      }, 500);
    } else {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileSuccess(result));
        enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }, 500);
    }
  }

  return (
    <Page title="Tạo tài khoản giảng viên ">
      <div className={cls.root}>
        <TeacherDataExample></TeacherDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <TeacherUploadHistory></TeacherUploadHistory>
      </div>
    </Page>
  );
}
