import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { getToken } from "../../utils/mng-token";
import { setProfile } from "../../views/MakeRequest/redux";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../shared/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";

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

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const loading = useSelector((state) => state.profileSlice.fetching);
  const dp = useDispatch();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        headers: { Authorization: getToken() },
      });
      if (!response.ok) {
        alert(JSON.stringify(await response.json()));
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

export default DashboardLayout;
