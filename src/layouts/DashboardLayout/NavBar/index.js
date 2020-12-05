import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography, makeStyles } from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};

const items = [
  {
    href: "/cb-pdt/dang-ki-tham-gia",
    icon: UserIcon,
    title: "Đăng kí tham gia",
  },
  {
    href: "/cb-pdt/tao-tk-giao-vu",
    icon: UserIcon,
    title: "Tạo tài khoản giáo vụ",
  },
  {
    href: "/cb-pdt/tao-tk-giao-vien",
    icon: UserIcon,
    title: "Tạo tài khoản giáo viên",
  },
  {
    href: "/cb-pdt/tao-tk-sinh-vien",
    icon: UserIcon,
    title: "Tạo tài khoản sinh viên",
  },
  {
    href: "/cb-pdt/upload-mon-hoc",
    icon: UserIcon,
    title: "Upload môn học",
  },
  {
    href: "/cb-pdt/upload-lop-hoc",
    icon: UserIcon,
    title: "Upload lớp học",
  },
  {
    href: "/cb-pdt/upload-bang-cap",
    icon: UserIcon,
    title: "Upload bằng cấp",
  },
  {
    href: "/cb-pdt/thu-hoi-bang-cap",
    icon: UserIcon,
    title: "Thu hồi bằng câp",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const user = useSelector((state) => state.schoolProfile);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} component={RouterLink} src={user.imgSrc} to="/nh/thong-tin-ca-nhan" />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.level || "Cán bộ Phòng Đào Tạo"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" classes={{ paper: classes.mobileDrawer }} onClose={onMobileClose} open={openMobile} variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
