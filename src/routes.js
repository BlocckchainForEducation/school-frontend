import React from "react";
import { Navigate } from "react-router-dom";
import StaffDashboardLayout from "src/layouts/StaffDashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import NotFoundView from "src/shared/NotFoundView";

import SignInView from "src/views/guest/SignIn";
import SignUpView from "src/views/guest/SignUp";

import MakeRequest from "./views/staff/MakeRequest";
import Voting from "./views/staff/Voting";
import CreateBureauAccount from "./views/staff/CreateBureauAccount";
import CreateTeacherAccount from "./views/staff/CreateTeacherAccount";
import CreateStudentAccount from "./views/staff/CreateStudentAccount";

import { getToken } from "./utils/mng-token";

const routes = [
  {
    path: "/cb-pdt",
    element: <StaffDashboardLayout />,
    children: [
      { path: "dang-ki-tham-gia", element: <MakeRequest /> },
      { path: "bo-phieu", element: <Voting /> },
      { path: "tao-tk-giao-vu", element: <CreateBureauAccount /> },
      { path: "tao-tk-giang-vien", element: <CreateTeacherAccount /> },
      { path: "tao-tk-sinh-vien", element: <CreateStudentAccount /> },
      // { path: "upload-mon-hoc", element: <ShareCertificate /> },
      // { path: "upload-lop-hoc", element: <ShareCertificate /> },
      // { path: "upload-bang-cap", element: <ShareCertificate /> },
      // { path: "thu-hoi-bang-cap", element: <ShareCertificate /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "dang-ki", element: <SignUpView /> },
      { path: "dang-nhap", element: <SignInView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Redirector /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
];

function Redirector(props) {
  const token = getToken();
  if (!token) {
    return <Navigate to="/dang-ki"></Navigate>;
  } else {
    return <Navigate to="/cb-pdt/dang-ki-tham-gia" />;
  }
}

export default routes;
