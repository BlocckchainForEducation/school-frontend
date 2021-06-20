import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "src/shared/Page";
import DragnDropZone from "../../../shared/DragnDropZone";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";
import CertificateDataExample from "./CertificateDataExample";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import UploadedCertificateTable from "./UploadedCertificateTable";

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

export default function UploadCertificate() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.certificateSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // FIXME: remove this mockup
  // useEffect(() => {
  //   enqueueSnackbar("TxFail: Sinh viên 20195755 - Bùi Hải Anh	chưa đủ điều kiện cấp bằng!", { ...ERR_TOP_CENTER, persist: true });
  //   enqueueSnackbar("TxFail: Sinh viên 20195756	- Bùi Quang Anh chưa đủ điều kiện cấp bằng!", { ...ERR_TOP_CENTER, persist: true });
  //   enqueueSnackbar("TxFail: Sinh viên 20196277 - Đào Hoàng Anh	chưa đủ điều kiện cấp bằng!", { ...ERR_TOP_CENTER, persist: true });
  // }, []);

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    try {
      const response = await axios.post("/staff/upload-certificates", formData);
      enqueueSnackbar("Upload file thành công!", SUCCESS_BOTTOM_CENTER);
      dp(uploadFileSuccess(response.data));
    } catch (error) {
      console.error(error);
      if (error.response) enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
      dp(uploadFileFail());
    }
  }

  return (
    <Page title="Upload bằng cấp">
      <div className={cls.root}>
        <CertificateDataExample></CertificateDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <UploadedCertificateTable></UploadedCertificateTable>
      </div>
    </Page>
  );
}
