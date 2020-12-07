import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragnDropZone from "../../shared/DragnDropZone";
import View from "../../shared/View";
import { getToken } from "../../utils/mng-token";
import BureauDataExample from "./BureauDataExample";
import BureauUploadHistory from "./BureauUploadHistory";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function CreateBureauAccount() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.bureauSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    console.log("prepare send file");
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create-bureau`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileFail());
        enqueueSnackbar("Some thing went wrong: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
      }, 1500);
    } else {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileSuccess(result));
        enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }, 1500);
    }
  }

  return (
    <View title="Tạo tài khoản giáo vụ ">
      <div className={cls.root}>
        <BureauDataExample></BureauDataExample>
        <DragnDropZone onDropAccepted={(hdUploadFile, uploading)}></DragnDropZone>
        <BureauUploadHistory></BureauUploadHistory>
      </div>
    </View>
  );
}
