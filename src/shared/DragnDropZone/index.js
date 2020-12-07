import { Paper } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import loading2 from "react-useanimations/lib/loading2";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 4,
  borderRadius: 4,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  // backgroundColor: "#fafafa",
  // backgroundColor: "white",
  // color: "#bdbdbd",
  color: "rgba(0,0,0,0.7)",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function DragnDropZone({ onDropAccepted, uploading }) {
  const { enqueueSnackbar } = useSnackbar();

  function onDropRejected(fileRejections) {
    enqueueSnackbar("Chỉ chấp nhận excel file!", { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    onDropRejected,
    onDropAccepted,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Paper>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {uploading ? (
          <>
            <UseAnimations animation={loading2} size={75} />
            <p>Uploading...</p>
          </>
        ) : (
          <>
            <UseAnimations animation={arrowDown} size={75} />
            <p>Drag 'n' drop excel file here, or click to select file</p>
          </>
        )}
      </div>
    </Paper>
  );
}
