import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import NotFoundView from "src/shared/NotFoundView";
import SignInView from "src/views/SignIn";
import SignUpView from "src/views/SignUp";
import MakeRequest from "src/views/MakeRequest";
import { getToken } from "./utils/mng-token";
import Voting from "./views/Voting";
import CreateBureauAccount from "./views/CreateBureauAccount";

const routes = [
  {
    path: "/cb-pdt",
    element: <DashboardLayout />,
    children: [
      { path: "dang-ki-tham-gia", element: <MakeRequest /> },
      { path: "bo-phieu", element: <Voting /> },
      { path: "tao-tk-giao-vu", element: <CreateBureauAccount /> },
      // { path: "tao-tk-giao-vien", element: <ShareCertificate /> },
      // { path: "tao-tk-sinh-vien", element: <ShareCertificate /> },
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
      { path: "*", element: <Navigate to="/404" /> },
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
