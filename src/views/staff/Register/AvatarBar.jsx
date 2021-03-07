import { Avatar, Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AvatarEditor from "react-avatar-edit";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { updateImgSrc } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 128,
    width: 128,
    margin: "auto",
    position: "relative",
  },
  paper: {
    marginTop: "-64px",
    width: "100%",
  },
  name: {
    fontWeight: 600,
  },
  description: {
    fontWeight: 300,
    lineHeight: "1.5rem",
  },
}));

export default function AvatarBar() {
  const cls = useStyles();
  const schoolName = useSelector((state) => state.profileSlice.universityName);
  const avatarSrc = useSelector((state) => state.profileSlice.imgSrc);
  const description = useSelector((state) => state.profileSlice.description);

  const { enqueueSnackbar } = useSnackbar();
  const dp = useDispatch();

  const [shouldShowEditor, setShowEditor] = useState(!avatarSrc);
  const [cropedImgBase64, setCropedImgBase64] = useState(null);

  function hdCrop(cropedImg) {
    setCropedImgBase64(cropedImg);
  }

  async function hdClose() {
    await hdChangeCropedAvatar(base64ToFile(cropedImgBase64, "avatar"));
    setShowEditor(false);
  }

  // convert base64 -> File to send it to backend
  function base64ToFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function hdChangeCropedAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/change-avatar`, {
      method: "POST",
      headers: { Authorization: getToken() },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      enqueueSnackbar("Something went wrong: " + JSON.stringify(err), ERR_TOP_CENTER);
    } else {
      const imgSrc = await res.json();
      dp(updateImgSrc(imgSrc));
      enqueueSnackbar("Cập nhật Avatar thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "right" } });
    }
  }

  // async function hdChangeAvatar(e) {
  //   setShowEditor(true);
  // }

  return (
    <Box className={cls.root}>
      {shouldShowEditor ? (
        <div>
          <div style={{ width: 300, height: 128, margin: "auto", position: "relative" }}>
            <AvatarEditor width={300} height={128} label="Ảnh đại diện" imageHeight={128} onCrop={hdCrop} onClose={hdClose}></AvatarEditor>
          </div>
        </div>
      ) : (
        // <label htmlFor="avatar">
        //   <input type="file" accept="image/*" id="avatar" style={{ display: "none" }} onChange={hdChangeAvatar} />
        //   <Avatar src={avatarSrc} className={cls.avatar}></Avatar>
        // </label>
        <Avatar src={avatarSrc} className={cls.avatar} onClick={() => {}}></Avatar>
      )}

      <Paper className={cls.paper}>
        <Box textAlign="center" px={3} pb={3} pt={"96px"}>
          <Typography variant="h5" gutterBottom>
            Cán bộ Trường
          </Typography>
          <Typography variant="h3" gutterBottom className={cls.name}>
            {schoolName || "Trường ĐH ABC"}
          </Typography>
          <Typography variant="body2" className={cls.description}>
            {description ||
              "Quisque laoreet, sem a cursus blandit, lectus libero vestibulum purus, id malesuada risus sem id nulla. Curabitur suscipit, dolor at imperdiet dapibus, arcu massa semper enim, vitae consectetur nulla leo blandit nisi. Duis aliquam non turpis sit amet pellentesque. Sed arcu neque, sollicitudin vel ultricies"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
