import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import Page from "src/shared/Page";
import ClassDataExample from "./ClassDataExample";
import DragnDropZone from "../../../shared/DragnDropZone";
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
  },
}));

export default function Uploadclass() {
  const cls = useStyles();
  const uploading = useSelector((state) => state.classSlice.uploading);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    dp(startUploadFile());
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/upload-classes`, {
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
      }, 2000);
    } else {
      setTimeout(() => {
        dp(uploadFileSuccess(result));
        enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }, 2000);
    }
  }

  return (
    <Page title="Upload lớp học">
      <div className={cls.root}>
        <ClassDataExample></ClassDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        <UploadedClassTable></UploadedClassTable>
      </div>
    </Page>
  );
}
