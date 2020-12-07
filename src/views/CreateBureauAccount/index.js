import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DragnDropZone from "../../shared/DragnDropZone";
import View from "../../shared/View";
import { getToken } from "../../utils/mng-token";
import BureauDataExample from "./BureauDataExample";
import BureauUploadHistory from "./BureauUploadHistory";
import { addHistoryItem, setPreloadHistory } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function CreateBureauAccount() {
  const cls = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dp = useDispatch();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/bureau-history`, {
      headers: { Authorization: getToken() },
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Fail to load history: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(setPreloadHistory(result));
    }
  }

  async function hdUploadFile(files) {
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create-bureau`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      enqueueSnackbar("Some thing went wrong: " + JSON.stringify(result), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
    } else {
      dp(addHistoryItem(result));
      enqueueSnackbar("Upload file thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <View title="Tạo tài khoản giáo vụ ">
      <div className={cls.root}>
        <BureauDataExample></BureauDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile}></DragnDropZone>
        <BureauUploadHistory></BureauUploadHistory>
      </div>
    </View>
  );
}
