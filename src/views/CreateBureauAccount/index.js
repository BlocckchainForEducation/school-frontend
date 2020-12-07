import { makeStyles } from "@material-ui/core";
import React from "react";
import DragnDropZone from "../../shared/DragnDropZone";
import View from "../../shared/View";
import BureauDataExample from "./BureauDataExample";
import BureauUploadHistory from "./BureauUploadHistory";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function CreateBureauAccount() {
  const cls = useStyles();

  async function hdUploadFile() {
    alert("ok");
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
