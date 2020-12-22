import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { getToken } from "src/utils/mng-token";
import { setProfile } from "src/views/staff/MakeRequest/redux";
import { useDispatch, useSelector } from "react-redux";
import Loading from "src/shared/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.background.dark,
  },
  wrapper: {
    flex: "1 1 auto",
    display: "flex",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    flex: "1 1 auto",
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    // height: "100%",
    overflow: "auto",
  },
}));

const StaffDashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const loading = useSelector((state) => state.profileSlice.fetching);
  const dp = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/staff/university-profile`, {
        headers: { Authorization: getToken() },
      });
      if (!response.ok) {
        enqueueSnackbar("Phiên làm việc đã kết thúc, vui lòng đăng nhập lại!", {
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: (key) => (
            <Button
              size="small"
              style={{ color: "white" }}
              onClick={(e) => {
                navigate("/dang-nhap");
                closeSnackbar(key);
              }}
            >
              Đăng nhập
            </Button>
          ),
        });
        // alert(JSON.stringify(await response.json()));
      } else {
        dp(setProfile(await response.json()));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <PerfectScrollbar>
                    <Outlet />
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StaffDashboardLayout;
