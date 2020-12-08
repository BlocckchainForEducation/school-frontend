import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragnDropZone from "../../../shared/DragnDropZone";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import SubjectDataExample from "./SubjectDataExample";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import UploadedSubjectTable from "./UploadedSubjectTable";

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

export default function UploadSubject() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.subjectSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/upload-subjects`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      dp(uploadFileFail());
      enqueueSnackbar("Some thing went wrong: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(uploadFileSuccess(result));
      enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <Page title="Upload môn học">
      <div className={cls.root}>
        <SubjectDataExample></SubjectDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <UploadedSubjectTable></UploadedSubjectTable>
      </div>
    </Page>
  );
}
