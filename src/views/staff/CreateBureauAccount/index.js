import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "src/shared/Page";
import { getToken } from "src/utils/mng-token";
import DragnDropZone from "../../../shared/DragnDropZone";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import BureauDataExample from "./BureauDataExample";
import BureauUploadHistory from "./BureauUploadHistory";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";

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

export default function CreateBureauAccount() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.bureauSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/create-bureau`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileFail());
        enqueueSnackbar("Something went wrong: " + JSON.stringify(result), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }, 500);
    } else {
      // TODO: remove setTimeout
      setTimeout(() => {
        dp(uploadFileSuccess(result));
        enqueueSnackbar("Tạo tài khoản cho các giáo vụ thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }, 500);
    }
  }

  return (
    <Page title="Tạo tài khoản giáo vụ ">
      <div className={cls.root}>
        <BureauDataExample></BureauDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <BureauUploadHistory></BureauUploadHistory>
      </div>
    </Page>
  );
}
